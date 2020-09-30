<template>
  <div class="tags-wrapper">
    <Header>
      <Icon value="back" @click="$router.back()" />
      <button @click="submit">确定</button>
    </Header>
    <main>
      <div
        v-for="(values, name) in systemTags"
        :key="name"
      >
        <h3 class="tagType">
          {{ values[0].title }}
        </h3>
        <ul class="tags">
          <li
            v-for="tag in values"
            class="tagItem"
            :key="tag.value"
            @click="onTagClick(tag)"
          >
            <div
              class="iconBorder"
              :class="isTagSelected(tag) ? 'selected': ''"
            >
              <Icon :value="tag.value" />
            </div>
            <span class="title">
              {{ tag.title }}
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import Header from '@/components/bill/Header.vue'
import { systemIncomeTags, systemOutlayTags, SystemTags } from '@/constants/systemTags'

@Component({
  components: { Header, Icon }
})
export default class extends Vue {

  systemTags!: SystemTags
  selectedTags: TagItem[] = []

  created() {
    const type = this.$route.query.type
    if (type === '-') {
      this.systemTags = systemOutlayTags
      this.$store.commit('getUserTags', 'userOutlayTags')
      this.selectedTags = this.$store.state.userOutlayTags
    } else {
      this.systemTags = systemIncomeTags
      this.$store.commit('getUserTags', 'userIncomeTags')
      this.selectedTags = this.$store.state.userIncomeTags
    }
  }

  isTagSelected(tag: TagItem) {
    return this.selectedTags.find(selectedTag => selectedTag.value === tag.value) !== undefined
  }

  onTagClick(tag: TagItem) {
    const tags = [...this.selectedTags]
    if (this.isTagSelected(tag)) {
      this.selectedTags = tags.filter(t => t.value !== tag.value)
    } else {
      tags.splice(-1, 0, tag)
      this.selectedTags = tags
    }
  }

  submit() {
    const type = this.$route.query.type
    if (type === '-') {
      this.$store.commit('setUserTags', {tagsType: 'userOutlayTags', tags: this.selectedTags})
    } else {
      this.$store.commit('setUserTags', {tagsType: 'userIncomeTags', tags: this.selectedTags})
    }
    this.$router.back()
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

.tags-wrapper header ::v-deep {
  justify-content: space-between;
}

.tags-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  button {
    font-size: 16px;
    color: #fff;
    padding-right: 5px;
  }
  main {
    padding: 16px 0;
    flex-grow: 1;
    overflow: auto;
  }
}
h3.tagType {
  font-size: 16px;
  color: #999;
  text-align: center;
  padding-top: 8px;
  font-weight: 400;
}
ul.tags {
  display:flex;
  flex-wrap: wrap;
  padding: 30px 8px 10px 8px;
  overflow: auto;
}
li.tagItem {
  margin-bottom: 20px;
  width: 20%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 28px; height: 28px;
    fill: #747777;
  }
}
div.iconBorder {
  display:flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  height: 40px; width: 40px;
  border-radius: 50%;
  margin-bottom: 10px;
  &.selected {
    border: 1px dashed $theme-color;
    .icon {
      fill: $theme-color;
    }
  }
}
span.title {
  font-size: 12px;
  color: #816E6F;
}
</style>