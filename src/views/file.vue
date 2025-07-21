<template>
  <store-container-layout :title="$t('views.file.TrSNRp')">
    <div class="file">
      <code-editor
        v-model:str="codeText"
        :mode="'ini'"
        :height="`${windowHeight - 280}px`"
      />
      <n-button
        type="primary"
        :loading="loading"
        style="width: 110px; margin: 20px 0"
        @click="onSubmit"
      >
        {{ $t('modal.EditAppModal.NWonXP') }}
      </n-button>
      <p class="bottom-str">
        {{ $t('views.file.eRGhTa') }}
      </p>
    </div>
  </store-container-layout>
</template>
<script setup lang=ts>
  import { useI18n } from 'vue-i18n';
  const { t: $t } = useI18n();
  import {
    StoreContainerLayout,
    CodeEditor,
    useApp,
    naiveui,
  } from 'gm-app-components';
  const { windowHeight } = useApp();
  import { onActivated, ref } from 'vue';
  import ProxyServe from '@/hooks/index';
  const codeText = ref('');
  const getData = () => {
    ProxyServe.getConf().then((res) => {
      codeText.value = res.data.data;
    });
  };
  onActivated(() => {
    getData();
  });
  const loading = ref(false);
  const onSubmit = () => {
    naiveui.dialog.warning({
      maskClosable: false,
      title: $t('views.index.JZ7uUE'),
      content: $t('views.file.sYqlC1'),
      positiveText: $t('views.index.LJQKql'),
      negativeText: $t('views.index.ROlxB8'),
      class: 'dialog-warning',
      onPositiveClick: () => {
        loading.value = true;
        ProxyServe.setConf(codeText.value).then(() => {
          naiveui.message.success($t('views.file.XdofrU'));
        }).finally(()=>{
          loading.value = false;
        });
      },
    });
  };
</script>
