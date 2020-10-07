<template>
  <div class="userTags-wrapper">
    <ul class="tags">
      <li
        :key="tag.value"
        class="tag"
        v-for="tag in userTags"
        @click="onTagClick(tag)"
      >
        <div
          class="iconWrapper"
          :class="{active: selectedTagValue === tag.value, define: tag.value === 'define'}"
          :style="{'--tagColor': tagColors[tag.value]}"
        >
          <Icon :value="tag.value" />
        </div>
        <span class="title">{{ tag.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import router from '@/router'
import { userIncomeTags, userOutlayTags } from '@/constants/userDefaultTags'
import Icon from '@/components/Icon.vue'
import tagColors from '@/constants/tagColors'

@Component({
  components: { Icon }
})
export default class extends Vue {

  @Prop({ type: String }) type!: AmountType
  @Prop({ type: Object }) defaultTag!: TagItem

  userTags: TagItem[] = []
  selectedTagValue = ''
  tagColors = tagColors

  @Watch('type', { immediate: true })
  onTypeChange() {
    let tags: TagItem[] = []
    if (this.type === '-') {
      this.$store.commit('getUserTags', 'userOutlayTags')
      if (this.$store.state.userOutlayTags.length === 0) {
        tags = userOutlayTags
      } else {
        tags = this.$store.state.userOutlayTags
      }
    } else {
      this.$store.commit('getUserTags', 'userIncomeTags')
      if (this.$store.state.userIncomeTags.length === 0) {
        tags = userIncomeTags
      } else {
        tags = this.$store.state.userIncomeTags
      }
    }
    // 没有传入默认选中的tag 则默认选中选对应类型tag列表的第一个
    if (!this.defaultTag) {
      this.selectedTagValue = tags[0].value
      this.$emit('onSelect', tags[0])
    } else {
      this.selectedTagValue = this.defaultTag.value
      this.$emit('onSelect', this.defaultTag)
    }
    let dbUserTags
    if (this.type === '-') {
      this.$store.commit('getUserTags', 'userOutlayTags')
      dbUserTags = this.$store.state.userOutlayTags
    } else {
      this.$store.commit('getUserTags', 'userIncomeTags')
      dbUserTags = this.$store.state.userIncomeTags
    }
    // 数据库没有 则设置默认值
    if (dbUserTags.length === 0) {
      this.userTags = tags
      const tagsType = this.type === '-' ? 'userOutlayTags' : 'userIncomeTags'
      this.$store.commit('setUserTags', { tagsType, tags })
    } else {
      this.userTags = dbUserTags
    }
  }

  onTagClick(tag: TagItem) {
    if (tag.value !== 'define') {
      this.selectedTagValue = tag.value
      this.$emit('onSelect', tag)
    } else {
      router.push(`/tags?type=${ encodeURIComponent(this.type) }`)
    }
  }

}
</script>

<style scoped lang="scss">
.userTags-wrapper {
  flex-grow: 99;
  box-shadow: 0 0 1px rgba(0, 0, 0, .25);
  overflow: auto;
  background: #FDFAF1;
}

ul.tags {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 8px 10px 8px;
  overflow: auto;
}

li.tag {
  margin-bottom: 20px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 28px; height: 28px;
    fill: #747777;
  }
}

div.iconWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ECF0EF;
  height: 40px; width: 40px;
  border-radius: 50%;
  margin-bottom: 10px;
  &.active {
    background: var(--tagColor);
    > .icon {
      fill: #fff;
    }
  }
  &.define {
    background: #ECF0EF;
    border: 1px dashed #AAAAA8;
    > .icon {
      fill: #747777;
    }
  }
}

span.title {
  font-size: 12px;
  color: #816E6F;
}
</style>