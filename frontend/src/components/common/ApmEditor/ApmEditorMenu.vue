<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import AEImgMenuBtn from 'src/components/common/ApmEditor/AEImgMenuBtn.vue'
import AELinkMenuBtn from 'src/components/common/ApmEditor/AELinkMenuBtn.vue'
import AEMenuBtn from 'src/components/common/ApmEditor/AEMenuBtn.vue'
import CodeTagsIcon from 'nvd-u/icons/CodeTags.vue'
import FormatAlignCenterIcon from 'nvd-u/icons/FormatAlignCenter.vue'
import FormatAlignJustifyIcon from 'nvd-u/icons/FormatAlignJustify.vue'
import FormatAlignLeftIcon from 'nvd-u/icons/FormatAlignLeft.vue'
import FormatAlignRightIcon from 'nvd-u/icons/FormatAlignRight.vue'
import FormatBoldIcon from 'nvd-u/icons/FormatBold.vue'
import FormatHeader1Icon from 'nvd-u/icons/FormatHeader1.vue'
import FormatItalicIcon from 'nvd-u/icons/FormatItalic.vue'
import FormatListBulletedIcon from 'nvd-u/icons/FormatListBulleted.vue'
import FormatListNumberedIcon from 'nvd-u/icons/FormatListNumbered.vue'
import FormatQuoteOpenIcon from 'nvd-u/icons/FormatQuoteOpen.vue'
import FormatStrikethroughVariantIcon from 'nvd-u/icons/FormatStrikethroughVariant.vue'
import FormatUnderlineIcon from 'nvd-u/icons/FormatUnderline.vue'
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
    editor?: Editor,
}>(), {
    editor: null,
})

</script>

<template>
    <div class="apm-editor-menu d-flex align-items-center gap-1 p-3">
        <AEMenuBtn
            :active="editor.isActive('heading', {level: 1})"
            @click="editor.chain().focus().toggleHeading({level: 1}).run()">
            <FormatHeader1Icon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('bold')"
            @click="editor.chain().focus().toggleBold().run()">
            <FormatBoldIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('italic')"
            @click="editor.chain().focus().toggleItalic().run()">
            <FormatItalicIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('underline')"
            @click="editor.chain().focus().toggleUnderline().run()">
            <FormatUnderlineIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('strike')"
            @click="editor.chain().focus().toggleStrike().run()">
            <FormatStrikethroughVariantIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('blockquote')"
            @click="editor.chain().focus().toggleBlockquote().run()">
            <FormatQuoteOpenIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('code')"
            @click="editor.chain().focus().toggleCode().run()">
            <CodeTagsIcon/>
        </AEMenuBtn>

        <div class="separator"></div>

        <AEMenuBtn
            :active="editor.isActive('bulletList')"
            @click="editor.chain().focus().toggleBulletList().run()">
            <FormatListBulletedIcon/>
        </AEMenuBtn>

        <AEMenuBtn
            :active="editor.isActive('orderedList')"
            @click="editor.chain().focus().toggleOrderedList().run()">
            <FormatListNumberedIcon/>
        </AEMenuBtn>

        <div class="separator"></div>

        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'left' })"
            @click="editor.chain().focus().setTextAlign('left').run()">
            <FormatAlignLeftIcon/>
        </AEMenuBtn>
        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'center' })"
            @click="editor.chain().focus().setTextAlign('center').run()">
            <FormatAlignCenterIcon/>
        </AEMenuBtn>
        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'right' })"
            @click="editor.chain().focus().setTextAlign('right').run()">
            <FormatAlignRightIcon/>
        </AEMenuBtn>
        <AEMenuBtn
            :active="editor.isActive({ textAlign: 'justify' })"
            @click="editor.chain().focus().setTextAlign('justify').run()">
            <FormatAlignJustifyIcon/>
        </AEMenuBtn>

        <div class="separator"></div>

        <AELinkMenuBtn :editor="editor"/>
        <AEImgMenuBtn :editor="editor"/>
    </div>
</template>

<style scoped lang="scss">
</style>
