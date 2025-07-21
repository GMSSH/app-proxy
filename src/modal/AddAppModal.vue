<template>
  <modal-layout :show="visibly" @after-enter="onActive" @after-leave="onLeave">
    <modal-form-layout
      :width="400"
      :title="$t('modal.AddAppModal.Whq9RF')"
      @on-cancel="closeModal"
      @on-confirm="submit"
    >
      <n-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :show-require-mark="false"
        label-placement="left"
        label-width="110"
        style="width: calc(100% - 30px)"
      >
        <n-form-item
          :label="$t('modal.AddAppModal.2TuvVD')"
          path="app_type"
          size="small"
        >
          <n-radio-group v-model:value="formState.app_type">
            <n-space>
              <n-radio value="frontend">
                {{ $t('modal.AddAppModal.GkMMQF') }}
              </n-radio>
              <n-radio value="fullstack">
                {{ $t('modal.AddAppModal.4d5Jom') }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item
          :label="$t('modal.AddAppModal.cjR1KB')"
          path="name"
          size="small"
        >
          <app-name-form-item v-model:value="formState.name" />
        </n-form-item>
        <n-form-item
          :label="$t('modal.AddAppModal.SCl2A8')"
          path="url"
          size="small"
        >
          <n-input
            v-model:value="formState.url"
            clearable
            :placeholder="$t('modal.AddAppModal.1cGLnv')"
          />
        </n-form-item>
        <template v-if="formState.app_type == 'fullstack'">
          <n-form-item
            :label="$t('modal.AddAppModal.m9n21q')"
            path="transport"
            size="small"
          >
            <n-radio-group v-model:value="formState.transport">
              <n-space>
                <n-radio value="http"> HTTP </n-radio>
                <n-radio value="socket"> Socket </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item
            v-if="formState.transport == 'http'"
            :label="$t('modal.AddAppModal.jX6k0s')"
            path="port"
            size="small"
          >
            <n-input-number
              v-model:value="formState.port"
              clearable
              :placeholder="$t('modal.AddAppModal.jbsZFL')"
            />
          </n-form-item>

          <n-form-item
            v-if="formState.transport == 'socket'"
            :label="$t('modal.AddAppModal.Xnf5nO')"
            path="socket_path"
            size="small"
          >
            <select-directory
              v-model:value="formState.socket_path"
              type="file"
            />
          </n-form-item>
        </template>
      </n-form>
    </modal-form-layout>
  </modal-layout>
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t: $t } = useI18n();
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { addDevAppApi } from '@/api';
  import {
    SelectDirectory,
    ModalLayout,
    ModalFormLayout,
    naiveui,
  } from 'gm-app-components';
  import { AddApp } from '@/api/type';

  defineProps<{ visibly: boolean }>();
  const emit = defineEmits(['update:visibly', 'onUpdate']);
  const returnOrgForm = (): AddApp => ({
    name: '',
    socket_path: '',
    port: 0,
    transport: 'http',
    app_type: 'frontend',
    url: '',
  });
  const rules = {
    port: {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error($t('modal.AddAppModal.318UXp'));
        } else if (
          !/^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
            value
          )
        ) {
          return new Error($t('modal.AddAppModal.yActvG'));
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
    socket_path: {
      required: true,
      message: $t('modal.AddAppModal.1VXj1B'),
      trigger: ['input', 'blur'],
    },

    name: {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error($t('modal.AddAppModal.ullhoz'));
        }
        if (value.split('/')[0] && value.split('/')[1]) {
          return true;
        } else {
          return new Error($t('modal.AddAppModal.0miXN2'));
        }
      },
      trigger: ['input', 'blur'],
    },

    url: {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error($t('modal.AddAppModal.eIbqEb'));
        }
        try {
          new URL(value);
          return true;
        } catch (e) {
          return new Error($t('modal.AddAppModal.EY34iF'));
        }
      },
      trigger: ['input', 'blur'],
    },
  };
  const formState = ref(returnOrgForm());
  const formRef = ref<FormInst | null>(null);

  const onActive = () => {};
  const onLeave = () => {
    formState.value = returnOrgForm();
  };
  const submit = ({ done }) => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        addDevAppApi(formState.value)
          .then((res) => {
            emit('update:visibly', false);
            emit('onUpdate');
            naiveui.message.success(res.msg);
          })
          .finally(done);
      } else {
        done();
      }
    });
  };
  const closeModal = () => {
    emit('update:visibly', false);
  };
</script>
