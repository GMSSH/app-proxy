<template>
  <n-input
    :value="name1"
    clearable
    :placeholder="$t('components.AppNameFormItem.pUCAsc')"
    @input="handleInput1"
  />
  <span style="margin: 0 10px">/</span>
  <n-input
    :value="name2"
    clearable
    :placeholder="$t('components.AppNameFormItem.w2EWkK')"
    @input="handleInput2"
  />
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  const { t: $t } = useI18n();
  import { computed } from 'vue';

  const props = defineProps<{
    value: string;
  }>();
  const emit = defineEmits(['update:value']);
  const name1 = computed(() => {
    return props.value.split('/')[0] || '';
  });
  const name2 = computed(() => {
    return props.value.split('/')[1] || '';
  });

  const handleInput1 = (val: string) => {
    emit('update:value', `${val}/${name2.value}`);
  };
  const handleInput2 = (val: string) => {
    emit('update:value', `${name1.value}/${val}`);
  };
</script>
