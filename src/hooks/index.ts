/**
 * 代理服务控制模块
 * 包含服务管理、配置操作、日志记录等核心功能
 * 依赖模块：yaml, winston（建议日志模块）
 */
// ==================== 模块依赖 ====================
// const fs = require('fs');
// const path = require('path');
// const { execSync } = require('child_process');
// const yaml = require('yaml'); // YAML 解析库
import yaml from 'js-yaml';
// const { format, transports } = require('winston'); // 日志库（建议使用）

// ==================== 全局配置 ====================

import { getFileBodyApi, saveFileBodyApi } from '@/api';
import { naiveui, Result } from 'gm-app-components';

/** BASE_URL */
const BASE_URL = '/.__gmssh/plugin/official/proxy/app/www/proxy/';

/** 插件名称标识 */
const PLUGIN_NAME = 'proxy';

/** 服务文件路径 */
const SERVER_FILE = `${BASE_URL}soproxy`;

/** 服务日志路径 */
const SERVER_LOG = `/.__gmssh/logs/plugin/official/proxy/soproxy.log`;

/** 配置文件存储路径 */
export const CONFIG_FILE_PATH = `/.__gmssh/data/plugin/official/proxy/config.yaml`;

// ==================== 核心配置 ====================
const OPERATOR_MAPPING = {
  serviceDo: '服务操作',
  setConf: '配置更新',
  getConf: '配置读取',
};

// ==================== 核心功能 ====================

/**
 * 操作日志装饰器工厂
 * @param {Function} fn 被装饰的方法
 * @returns {Function} 包装后的函数
 *
 * 处理逻辑：
 * 1. 获取会话信息
 * 2. 参数脱敏处理
 * 3. 生成日志模板
 * 4. 写入日志文件
 */
function operatorLogRecord(fn) {
  return function (...args) {
    // 获取操作名称
    const operatorName = OPERATOR_MAPPING[fn.name] || fn.name;

    const logShell = `# 创建日志文件的父目录（如果不存在
mkdir -p "$(dirname "${SERVER_LOG}")"   
if [ ! -f "${SERVER_LOG}" ]; then
    touch "${SERVER_LOG}"
fi
LOG_TIME=$(date "+%Y-%m-%d %H:%M:%S")
OPERATION_TYPE="INFO"
METHOD_NAME="exampleMethod"
PARAMETERS="param1=value1 param2=value2"

echo "[$LOG_TIME] [${fn.name}] [${operatorName}] Parameters: ${args}" >> ${SERVER_LOG}`;
    window.$gm.request<Result<string>>('/api/command/exec_script', {
      method: 'post',
      data: {
        script: btoa(unescape(encodeURIComponent(logShell))),
      },
    });
    return fn.apply(this, args); // 继续执行原始方法
  };
}

/**
 * YAML 格式校验
 * @param {string} content YAML 格式字符串
 * @throws {Error} 格式错误时抛出异常
 *
 * 校验规则：
 * 1. 非空内容
 * 2. 有效 YAML 格式
 * 3. 必须为对象类型
 */
function isValidYaml(content) {
  try {
    const data = yaml.load(content);
    if (!data) {
      naiveui.message.error('请确认输入了有效的内容');
    }
    return true;
  } catch (e) {
    naiveui.message.error('请确认输入的格式(yaml)格式是否有效');
    return false;
  }
}

// ==================== 服务控制 ====================
/**
 * 代理服务主类
 * 继承自 BaseController（需实现基础控制功能）
 */
class ProxyMain {
  // 服务状态相关方法

  /**
   * 检查服务运行状态
   * @returns {number} 进程ID（0表示未运行）
   *
   * 使用 pgrep 命令查找进程：
   * - 返回匹配的进程ID
   * - 无匹配时返回0
   */
  checkRun(): Promise<Result<string>> {
    return new Promise((resolve, reject) => {
      window.$gm
        .request<Result<string>>('/api/command/exec_script', {
          method: 'post',
          data: {
            script: btoa(
              unescape(
                encodeURIComponent(`pid=$(pgrep soproxy)
if [ -n "$pid" ]; then
echo "$pid"
else
exit 1
fi`)
              )
            ),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 获取服务状态
   * @returns {Object} 状态响应对象
   *
   * 响应格式：
   * {
   *   status: true|false,  // true表示运行中
   *   message: '状态描述'
   * }
   */
  getStatus(): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const res = await this.checkRun();
        const pid = parseInt(res.data || '0');
        if (pid) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        resolve(false);
      }
    });
  }

  // 服务操作方法

  /**
   * 服务操作执行方法
   * @param {Od} action 操作数据对象
   * @returns {Object} 操作结果
   *
   * 支持操作类型：
   * - start：启动服务
   * - stop：停止服务
   * - restart：重启服务
   */
  @operatorLogRecord
  serviceDo(action: 'start' | 'stop' | 'restart') {
    // 执行对应操作
    if (action === 'start') {
      return this.start();
    } else if (action === 'stop') {
      return this.stop();
    } else if (action === 'restart') {
      return this.restart();
    }
  }

  /**
   * 启动服务
   * @param {boolean} add_rc 是否添加开机自启
   * @returns {Array} [成功状态, 消息]
   *
   * 操作流程：
   * 1. 检查当前状态
   * 2. 初始化配置
   * 3. 设置执行权限
   * 4. 启动服务进程
   * 5. 添加开机启动（可选）
   */
  start() {
    const rcFile = '/etc/rc.d/rc.local';
    // 启动服务
    const tmpShell = `nohup ${SERVER_FILE} ${CONFIG_FILE_PATH} > /dev/null 2>&1 &`;
    const shell = `pid=$(pgrep soproxy)
if [ -n "$pid" ]; then
echo "1"
exit 0
else
# 定义 CONFIG_FILE_PATH
CONFIG_FILE_PATH="/.__gmssh/data/plugin/official/proxy/config.yaml"
init_code="0"
# 检查文件是否存在
if [ ! -f "$CONFIG_FILE_PATH" ]; then
    # 创建目录
    mkdir -p "$(dirname "$CONFIG_FILE_PATH")"

    # 复制文件
    cp "${BASE_URL}config.yaml" "$CONFIG_FILE_PATH"

    # 检查复制是否成功
    if [ $? -eq 0 ]; then
        init_code="1"
    else
        init_code="0"
        exit 1
    fi
else
    # 文件已经存在，直接返回成功
    init_code="1"
fi
echo "$init_code"
# 设置执行权限
chmod +x ${SERVER_FILE}

# 启动服务
${tmpShell}

# 添加自启动
# 追加内容到文件末尾
echo '${tmpShell}' >> '${rcFile}'

# 为文件添加可执行权限
chmod +x ${rcFile}
fi`;
    return new Promise((resolve, reject) => {
      window.$gm
        .request<Result<string>>('/api/command/exec_script', {
          method: 'post',
          data: {
            script: btoa(unescape(encodeURIComponent(shell))),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 停止服务
   * @param {boolean} rm_rc 是否移除开机自启
   * @returns {Array} [成功状态, 消息]
   *
   * 操作流程：
   * 1. 检查当前状态
   * 2. 终止进程
   * 3. 移除开机启动（可选）
   */
  stop() {
    const rcFile = '/etc/rc.d/rc.local';
    const shell = `pid=$(pgrep soproxy)
if [ -n "$pid" ]; then
#杀掉进程
kill -9 $pid

#关闭自启动
# 使用 grep 过滤掉包含 soproxy 的行，并覆盖写入原文件
grep -v 'soproxy' "${rcFile}" > "${rcFile}.tmp" && mv "${rcFile}.tmp" "${rcFile}"
echo "1"
else
exit 1
fi`;
    return new Promise((resolve, reject) => {
      window.$gm
        .request<Result<string>>('/api/command/exec_script', {
          method: 'post',
          data: {
            script: btoa(unescape(encodeURIComponent(shell))),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 重启服务
   * @returns {Array} [成功状态, 消息]
   *
   * 操作流程：
   * 1. 停止
   * 2. 启动
   */
  restart() {
    return new Promise((resolve, reject) => {
      this.stop()
        ?.then(() => {
          this.start()
            ?.then(() => {
              resolve(true);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 读取配置
   * @returns {Object} 响应结果
   *
   */
  @operatorLogRecord
  getConf(): Promise<Result<{ data: string }>> {
    const shell = `# 定义 CONFIG_FILE_PATH
CONFIG_FILE_PATH="/.__gmssh/data/plugin/official/proxy/config.yaml"
# 检查文件是否存在
if [ ! -f "$CONFIG_FILE_PATH" ]; then
    # 创建目录
    mkdir -p "$(dirname "$CONFIG_FILE_PATH")"

    # 复制文件
    cp "${BASE_URL}config.yaml" "$CONFIG_FILE_PATH"

    # 检查复制是否成功
    if [ $? -eq 0 ]; then
        echo "1"
    else
        exit 1
    fi
else
    # 文件已经存在，直接返回成功
    echo "1"
fi`;
    return new Promise((resolve, reject) => {
      window.$gm
        .request<Result<{ data: string }>>('/api/command/exec_script', {
          method: 'post',
          data: {
            script: btoa(unescape(encodeURIComponent(shell))),
          },
        })
        .then(() => {
          getFileBodyApi(CONFIG_FILE_PATH)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /**
   * 设置配置
   * @param {Od} data 请求数据对象
   * @returns {Object} 响应结果
   *
   * 操作流程：
   * 1. 参数校验
   * 2. YAML 格式验证
   * 3. 写入配置文件
   * 4. 重启服务
   */
  @operatorLogRecord
  setConf(data) {
    return new Promise((resolve, reject) => {
      if (!isValidYaml(data)) {
        reject();
      } else {
        saveFileBodyApi({
          path: CONFIG_FILE_PATH,
          data,
          encoding: 'utf-8',
        }).then(() => {
          this.stop().then(() => {
            this.start().then(() => {
              resolve(true);
            });
          });
        });
      }
    });
  }
}

// ==================== 模块导出 ====================
export default new ProxyMain();
