<template>
  <store-container-layout :title="$t('views.control.ln4ET9')">
    <!--    <n-spin v-if="status" :show="loading" style="height: 100%">-->
    <!--      当前状态:-->
    <div class="control-status">
      <div class="control-label-flex">
        <div :class="[status ? '' : 'on']" class="control-label">
          {{ $t('views.control.Ai4uYe')
          }}<span :class="[!status ? 'on' : '']">{{
            status ? $t('views.control.Kxajn8') : $t('views.control.YDOHeC')
          }}</span>
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
    <!--    </n-spin>-->
  </store-container-layout>
</template>
<script setup lang="ts">
  import { ref, onActivated } from 'vue';
  import { StoreContainerLayout, naiveui } from 'gm-app-components';
  import { useI18n } from 'vue-i18n';
  import ProxyServe from '@/hooks/index';
  const status = ref<boolean>(false);
  const loading = ref(false);
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
        loading.value = true;
        ProxyServe.serviceDo(action)?.then(() => {
          naiveui.message.success($t('views.control.2AN3Dz'));
          getStatus();
        });
      },
    });
  };

  const getStatus = () => {
    loading.value = true;
    ProxyServe.getStatus().then((res) => {
      status.value = res;
    });
  };

  onActivated(() => {
    getStatus();
  });
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
</script>
<style lang="scss" scoped>
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
</style>
