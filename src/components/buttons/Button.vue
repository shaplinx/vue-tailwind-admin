<template>
  <component
    class="btn font-medium flex  items-center cursor-pointer border-2 shadow    hover:shadow-lg focus:outline-none focus:shadow-outline"
    :is="buttonType"
    :href="href"
    :type="type"
    :class="btnClasses"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import { computed, type PropType} from 'vue';



const props = defineProps({
  href: {
      required: false,
      type: String,
      default: null
    },
    type: {
      type: String as PropType<'button' | 'submit'>,
      default: "button" 
    },
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    color: {
      type: String as PropType<'primary'| 'secondary'| 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info' |'link' >,
      default: "neutral"
    },
    size: {
      type: String as PropType<'sm'| 'md'| 'lg'>,
      default: "md"
    },
    outline: Boolean,
    icon: Boolean,
    round: Boolean
  }
);

const colorClasses = computed(()=>  {
      const colorMapping = {
        primary : 'bg-primary text-primary-content border-primary hover:bg-primary-focus hover:border-primary-focus active:ring-2',
        secondary: 'bg-secondary text-secondary-content border-secondary hover:bg-secondary-focus hover:border-secondary-focus active:ring-2 ', 
        neutral :'bg-neutral text-neutral-content border-neutral hover:bg-neutral-focus hover:border-neutral-focus active:ring-2', 
        accent :'bg-accent text-accent-content border-accent hover:bg-accent-focus hover:border-accent-focus active:ring-2', 
        success :'bg-success text-success-content border-success hover:bg-success-focus hover:border-success-focus active:ring-2', 
        warning :'bg-warning text-warning-content border-warning hover:bg-warning-focus hover:border-warning-focus active:ring-2', 
        error :'bg-error text-error-content border-error hover:bg-error-focus hover:border-error-focus active:ring-2', 
        info : 'bg-info text-info-content border-info hover:bg-info-focus hover:border-info-focus active:ring-2',
        link : 'bg-tansparent text-base-content border-0 shadow-none  hover:bg-base-200 hover:border-bae-200 active:ring-2'
      }
      const outlineMapping = {
        primary : 'border-primary bg-base-100 text-primary hover:bg-primary hover:border-primary hover:text-primary-content active:ring-2 active:bg-primary-focus',
        secondary: 'border-secondary bg-base-100 text-secondary hover:bg-secondary hover:border-secondary hover:text-secondary-content active:ring-2 active:bg-secondary-focus ', 
        neutral :'border-neutral bg-base-100 text-neutral hover:bg-neutral hover:border-neutral hover:text-neutral-content active:ring-2 active:bg-neutral-focus', 
        accent :'border-accent bg-base-100 text-accent hover:bg-accent hover:border-accent hover:text-accent-content active:ring-2 active:bg-accent-focus', 
        success :'border-success bg-base-100 text-success hover:bg-success hover:border-success hover:text-success-content active:ring-2 active:bg-success-focus', 
        warning :'border-warning bg-base-100 text-warning hover:bg-warning hover:border-warning hover:text-warning-content active:ring-2 active:bg-warning-focus', 
        error :'border-error bg-base-100 text-error hover:bg-error hover:border-error hover:text-error-content active:ring-2 active:bg-error-focus', 
        info : 'border-info bg-base-100 text-info hover:bg-info hover:border-info hover:text-info-content active:ring-2 active:bg-info-focus',
        link : 'bg-base-200 shadow-none text-base-content border-base-300 hover:bg-base-300 hover:border-base-300 active:ring-2 active:bg-link-focus'
      }
      const color = ['primary', 'secondary', 'neutral' , 'accent' , 'success' , 'warning' , 'error' , 'info', 'link'].includes(props.color) ? props.color : 'neutral';

      return props.outline ? outlineMapping[color] : colorMapping[color];
    })

    const sizeClasses = computed(()=>  {
      const isIcon = props.icon;
      const sizeMappings = {
        sm: `h-8 text-sm ${isIcon ? "px-2" : "px-4"}`,
        md: `h-10 ${isIcon ? "px-3" : "px-6"}`,
        lg: `text-lg h-12 ${isIcon ? "px-4" : "px-12"}`
      };

      return sizeMappings[props.size] || sizeMappings.md;
    })

    const btnClasses = computed(()=>  {
      const borderRadiusClasses = props.round ? "rounded-full" : "rounded-lg";
      return `${colorClasses.value} ${sizeClasses.value} ${borderRadiusClasses}`;
    })

    const buttonType = computed(()=> {
      if (props.href) {
        return "a";
      } else {
        return "button";
      }
    })
 
</script>