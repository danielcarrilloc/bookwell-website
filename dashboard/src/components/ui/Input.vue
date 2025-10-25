<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-foreground mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>

    <div class="relative">
      <div
        v-if="iconLeft"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
      >
        <component :is="iconLeft" class="w-5 h-5" />
      </div>

      <input
        v-if="type !== 'textarea'"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <textarea
        v-else
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :class="textareaClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div
        v-if="iconRight"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
      >
        <component :is="iconRight" class="w-5 h-5" />
      </div>
    </div>

    <p
      v-if="error"
      class="mt-1.5 text-sm text-error"
    >
      {{ error }}
    </p>

    <p
      v-else-if="hint"
      class="mt-1.5 text-sm text-foreground-secondary"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'textarea' | 'date' | 'time' | 'datetime-local'
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  iconLeft?: any
  iconRight?: any
  autocomplete?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  disabled: false,
  required: false,
  rows: 4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const baseInputClasses = 'input flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const inputClasses = computed(() => {
  const classes = [baseInputClasses]

  if (props.error) {
    classes.push('border-error focus-visible:ring-error')
  } else {
    classes.push('border-border bg-background')
  }

  if (props.iconLeft) {
    classes.push('pl-10')
  }

  if (props.iconRight) {
    classes.push('pr-10')
  }

  return classes.join(' ')
})

const textareaClasses = computed(() => {
  const classes = [baseInputClasses, 'h-auto min-h-[80px] resize-y']

  if (props.error) {
    classes.push('border-error focus-visible:ring-error')
  } else {
    classes.push('border-border bg-background')
  }

  return classes.join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
