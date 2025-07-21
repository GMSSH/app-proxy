<template>
  <div class="container">
    <n-scrollbar style="padding: 20px; box-sizing: border-box">
      <div class="control-status">
        <div class="control-label-flex">
          <div :class="[status ? '' : 'on']" class="control-label">
            {{ $t('views.index.eM5frg') }}&nbsp;
            <span :class="[!status ? 'on' : '']">
              {{
                status ? $t('views.control.Kxajn8') : $t('views.control.YDOHeC')
              }}</span
            >
          </div>
          <div class="control-label-flex-btn">
            <!--          停止-->

            <n-tooltip v-if="status" trigger="hover">
              <template #trigger>
                <div class="control-label-flex-btn-item" @click="onStop">
                  <svg-icon icon="icon-tingzhi" color="var(--jm-accent-7)" />
                </div>
              </template>
              {{ $t('views.control.6yqVJv') }}
            </n-tooltip>

            <!--          启动-->
            <n-tooltip v-else trigger="hover">
              <template #trigger>
                <div class="control-label-flex-btn-item" @click="onStart">
                  <svg-icon icon="icon-kaishi" color="var(--jm-accent-7)" />
                </div>
              </template>
              {{ $t('views.control.ZwCBno') }}
            </n-tooltip>

            <!--          重启 -->
            <n-tooltip trigger="hover">
              <template #trigger>
                <div class="control-label-flex-btn-item" @click="onRestart">
                  <svg-icon icon="icon-zhongqi" color="var(--jm-accent-7)" />
                </div>
              </template>
              {{ $t('views.control.egotk7') }}
            </n-tooltip>
          </div>
        </div>
      </div>
      <div class="control-status" style="margin-top: 20px">
        <div class="control-label-flex">
          <div class="control-label">
            {{ $t('views.index.JI8NwA') }}
          </div>
          <div class="control-label-flex-btn">
            <n-button type="primary" @click="onOpenConfig">
              {{ $t('views.index.EbqSeJ') }}
            </n-button>
          </div>
        </div>
        <div class="proxy-form">
          <n-form
            ref="formRef"
            :size="'small'"
            :model="form"
            label-placement="left"
            label-align="left"
            label-width="auto"
            :rules="rules"
            require-mark-placement="right-hanging"
            :style="{
              maxWidth: '600px',
            }"
          >
            <n-form-item
              class="proxy-form-title"
              :label="$t('views.index.lGRCH3')"
            />
            <n-form-item :label="$t('views.index.a1AKNW')" path="userName">
              <n-input
                v-model:value="form.userName"
                style="width: 350px"
                :placeholder="$t('views.index.GWLoA5')"
              />
            </n-form-item>
            <n-form-item :label="$t('views.index.9H0Ul5')" path="password">
              <n-input
                v-model:value="form.password"
                style="width: 350px"
                :placeholder="$t('views.index.GWLoA5')"
              />
            </n-form-item>
            <n-form-item :label="$t('views.index.IZW39x')" path="socketPort">
              <n-input-number
                v-model:value="form.socketPort"
                style="width: 350px"
                clearable
                :min="0"
              />
            </n-form-item>
            <n-form-item :label="$t('views.index.ccqolf')" path="httpPort">
              <n-input-number
                v-model:value="form.httpPort"
                style="width: 350px"
                clearable
                :min="0"
              />
            </n-form-item>
            <n-form-item
              class="proxy-form-title"
              :label="$t('views.index.rL9jCz')"
            />
            <n-form-item :label="$t('views.index.JgHAAt')" path="enable">
              <n-switch v-model:value="form.enable" />
              <span class="tip-str">{{ $t('views.index.4tsXNW') }}</span>
            </n-form-item>
            <n-form-item :label="$t('views.index.TjMhgp')" path="path">
              <select-directory
                v-model:value="form.path"
                style="width: 350px"
              />
            </n-form-item>
            <n-form-item :label="$t('views.index.31IEje')" path="level">
              <n-radio-group v-model:value="form.level">
                <n-space>
                  <n-radio value="INFO"> INFO </n-radio>
                  <n-radio value="DEBUG"> DEBUG </n-radio>
                  <n-radio value="WARN"> WARN </n-radio>
                  <n-radio value="ERROR"> ERROR </n-radio>
                  <n-radio value="FATAL"> FATAL </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item :label="$t('views.index.I2sLZe')" path="maxSize">
              <n-input-number
                v-model:value="form.maxSize"
                style="width: 350px"
                clearable
                :min="0"
              >
                <template #suffix> MB </template>
              </n-input-number>
            </n-form-item>
            <n-form-item :label="$t('views.index.enA3oW')" path="maxBackups">
              <n-input-number
                v-model:value="form.maxBackups"
                style="width: 350px"
                clearable
                :min="0"
              />
            </n-form-item>
            <n-form-item :label="$t('views.index.6quMWn')" path="maxAge">
              <n-input-number
                v-model:value="form.maxAge"
                style="width: 350px"
                clearable
                :min="0"
              />
            </n-form-item>
            <n-form-item :label="$t('views.index.V9kee9')" path="compress">
              <n-switch v-model:value="form.compress" />
              <span class="tip-str">{{ $t('views.index.qfFBS2') }}</span>
            </n-form-item>

            <span class="tip-str" style="margin-left: 20px">{{
              $t('views.index.qqvhci')
            }}</span>
            <n-form-item label=" ">
              <n-button
                size="medium"
                type="primary"
                style="margin-top: 10px; min-width: 100px"
                :loading="loading"
                @click="onSubmit"
              >
                {{ $t('modal.EditAppModal.NWonXP') }}
              </n-button>
            </n-form-item>
          </n-form>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>
<script setup lang="ts">
  import { SelectDirectory, naiveui } from 'gm-app-components';
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import ProxyServe, { CONFIG_FILE_PATH } from '@/hooks/index';
  const status = ref<boolean>(false);
  const { t: $t } = useI18n();
  const setService = (text: string, action: 'start' | 'stop' | 'restart') => {
    naiveui.dialog.warning({
      maskClosable: false,
      title: $t('views.index.JZ7uUE'),
      content: `${$t('proxy', { text })}`,
      positiveText: $t('views.index.LJQKql'),
      negativeText: $t('views.index.ROlxB8'),
      class: 'dialog-warning',
      onPositiveClick: () => {
        ProxyServe.serviceDo(action)?.then(() => {
          naiveui.message.success($t('views.control.2AN3Dz'));
          getStatus();
          getData();
        });
      },
    });
  };

  const getStatus = () => {
    ProxyServe.getStatus().then((res) => {
      status.value = res;
    });
  };

  // 停止
  const onStop = () => {
    setService($t('views.control.6yqVJv'), 'stop');
  };
  // 启动
  const onStart = () => {
    setService($t('views.control.ZwCBno'), 'start');
  };
  // 重启
  const onRestart = () => {
    setService($t('views.control.egotk7'), 'restart');
  };

  const form = ref({
    userName: '',
    password: '',
    socketPort: 0,
    httpPort: 0,
    enable: false,
    path: '',
    level: 'INFO',
    maxSize: 0,
    maxBackups: 0,
    maxAge: 0,
    compress: false,
  });
  const rules = {
    socketPort: {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error($t('views.index.A05jWJ'));
        }
        if (
          !/^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
            value
          )
        ) {
          return new Error($t('views.index.jr588i'));
        }
        if (parseInt(value) == form.value.httpPort) {
          return new Error($t('views.index.Ob73Dd'));
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
    httpPort: {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error($t('views.index.QbM5O4'));
        }
        if (
          !/^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
            value
          )
        ) {
          return new Error($t('views.index.jr588i'));
        }
        if (parseInt(value) == form.value.socketPort) {
          return new Error($t('views.index.Ob73Dd'));
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
    path: {
      required: true,
      key: 'socket',
      message: $t('views.index.qSzznB'),
      trigger: ['input', 'blur'],
    },
    maxSize: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: $t('views.index.4L4dNA'),
    },
    maxBackups: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: $t('views.index.4L4dNA'),
    },
    maxAge: {
      type: 'number',
      required: true,
      trigger: ['blur', 'change'],
      message: $t('views.index.4L4dNA'),
    },
  };

  const formRef = ref();
  const sss = ref('');
  const getData = () => {
    ProxyServe.getConf().then((res) => {
      sss.value = res.data.data;
      const result: any = res.data.data.split('\n').reduce((acc, pair) => {
        const [key, value] = pair.split(':').map((item) => item.trim());
        acc[key] = value;
        return acc;
      }, {});
      form.value.userName = result.userName;
      form.value.password = result.password;
      form.value.socketPort = parseInt(result.socketPort) || 0;
      form.value.httpPort = parseInt(result.httpPort) || 0;
      form.value.enable = result.enable === 'true';
      form.value.path = result.path;
      form.value.level = result.level;
      form.value.maxSize = parseInt(result.maxSize) || 0;
      form.value.maxBackups = parseInt(result.maxBackups) || 0;
      form.value.maxAge = parseInt(result.maxAge) || 0;
      form.value.compress = result.compress === 'true';
    });
  };
  onMounted(() => {
    getData();
    getStatus();
  });
  const loading = ref(false);
  const onSubmit = () => {
    formRef.value?.validate((errors: any) => {
      if (!errors) {
        naiveui.dialog.warning({
          maskClosable: false,
          title: $t('views.index.JZ7uUE'),
          content: $t('views.file.sYqlC1'),
          positiveText: $t('views.index.LJQKql'),
          negativeText: $t('views.index.ROlxB8'),
          class: 'dialog-warning',
          onPositiveClick: () => {
            loading.value = true;
            const str = `proxy:
  userName: ${form.value.userName}
  password: ${form.value.password}
  socketPort: ${form.value.socketPort}
  httpPort: ${form.value.httpPort}

log:
  enable: ${form.value.enable}
  path: ${form.value.path}
  level: ${form.value.level}
  maxSize: ${form.value.maxSize}
  maxBackups: ${form.value.maxBackups}
  maxAge: ${form.value.maxAge}
  compress: ${form.value.compress}`;
            ProxyServe.setConf(str)
              .then(() => {
                naiveui.message.success($t('views.file.XdofrU'));
                status.value = true;
              })
              .finally(() => {
                loading.value = false;
              });
          },
        });
      }
    });
  };

  const onOpenConfig = () => {
    window.$gm.openCodeEditor(CONFIG_FILE_PATH);
  };
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    .control-label-flex {
      @include flex(flex-start);
      &-time {
        font-size: 12px;
        color: var(--jm-accent-7);
        margin-left: 26px;
      }
      &-btn {
        margin-left: auto;
        @include flex(flex-start);
        &-item {
          width: 32px;
          height: 32px;
          border: 1px solid var(--jm-accent-4);
          border-radius: 5px;
          @include flex(center, center);
          cursor: pointer;
          margin-left: 10px;
        }
      }
    }
    .control-status {
      background: var(--jm-accent-1);
      padding: 10px 20px 10px 20px;
      border-radius: 10px;
      &-info {
        @include flex(space-between);
        &-item {
          width: 33%;

          border-radius: 4px 4px 4px 4px;
          border: 1px solid var(--jm-accent-3);
          &-top {
            height: 30px;
            border-bottom: 1px solid var(--jm-accent-3);
            @include flex(flex-start);
            &-title {
              font-size: 12px;
              color: var(--jm-accent-7);
            }
          }
          &-body {
            @include flex(flex-start);
            .body-left {
              &-item {
                height: 15px;
                line-height: 1;
                font-size: 12px;
                color: var(--jm-accent-5);
                margin: 10px 0;
                position: relative;
                padding-left: 18px;
                white-space: nowrap;
                &:before {
                  position: absolute;
                  content: '';
                  width: 2px;
                  height: 2px;
                  border-radius: 50%;
                  background: var(--jm-accent-5);
                  top: 50%;
                  left: 10px;
                  transform: translateY(-50%);
                }
              }
            }
            .body-right {
              margin-left: 4px;
              white-space: nowrap;
              overflow: hidden;

              &-item {
                height: 15px;
                line-height: 1;
                font-size: 12px;
                color: var(--jm-primary-3);
                margin: 10px 0;
                @include ellipsis();
              }
            }
          }
        }
      }
    }
    .control-label {
      color: var(--jm-accent-7);
      font-weight: bold;
      font-size: 14px;
      margin: 15px 0;
      span {
        padding-right: 15px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzY4NkJDQjg0OEExMTFFRkJDNDM5QzU3QzEwNTUwQzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzY4NkJDQjk0OEExMTFFRkJDNDM5QzU3QzEwNTUwQzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjg2QkNCNjQ4QTExMUVGQkM0MzlDNTdDMTA1NTBDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNjg2QkNCNzQ4QTExMUVGQkM0MzlDNTdDMTA1NTBDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsVYWyYAAADkSURBVHjaYvz//z8DPQETA53BqIVD30IWfJIam/eCKHEg/g3E74gx8IavM0U+zAfiZ0D8GogXA7E0rYO0AaoGhGOA+CYQVwMxB60sFEDjcwNxCxBfB+IQeiYaBSBeDcQHgFifnqnUHojPAfFMIBalV7YAmZEGxLeB2Iue+ZAfiGfQO+Mz0tPCj0CcSA8L/wHxLCBWBeI9FBVtRICD0NLoIq2zxQMgDgViB1IsI8bCV2j8r0BcC8SaQLyGFiVNOzSOQA2fJUCsDi3aftCkegKCCUC8HMp+SZV8M9pqG7Vw0FsIEGAAX/gqE+FCoK4AAAAASUVORK5CYII=')
          no-repeat right;
        background-size: 16px;
        color: #0f8d28;
      }

      &.on {
        span {
          padding-right: 15px;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzJFNjI2MDE0OEExMTFFRkJDNDM5QzU3QzEwNTUwQzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzJFNjI2MDI0OEExMTFFRkJDNDM5QzU3QzEwNTUwQzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNjg2QkNCQTQ4QTExMUVGQkM0MzlDNTdDMTA1NTBDMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MkU2MjYwMDQ4QTExMUVGQkM0MzlDNTdDMTA1NTBDMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgBibiIAAAB5SURBVHjaYvz//z8DPQETA53BqIUjwMI3oqKeQPwYij0ZGRkZkDG6PCHzGAllC5BBQEoGyn0i+uaNLLL8axERFHmR169lKQ1SGRxsYuVHE82ohaMWjlo4aiGwQMbBJlaeZAvToAY9gbJJlSetehpNNKMWDriFAAEGAPflKcFtjtsEAAAAAElFTkSuQmCC')
            no-repeat right;
          background-size: 16px;
          color: #d70000;
        }
      }
    }
    .proxy-form {
      border-top: 1px solid var(--jm-accent-3);
      padding-top: 20px;
      margin-top: 10px;
    }
    .proxy-form-title {
      :deep(.n-form-item-label__text) {
        font-size: 18px !important;
        font-weight: bold;
      }
    }
    .tip-str {
      font-size: 12px;
      color: #777777;
      margin-left: 5px;
      white-space: nowrap;
    }
  }
</style>
