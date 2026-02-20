"use client";

import { useEffect, useCallback } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TipTapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  onSelectionChange?: (text: string) => void;
  onEditorReady?: (editor: Editor) => void;
  placeholder?: string;
  subject?: string;
  onSubjectChange?: (value: string) => void;
  preview?: string;
  onPreviewChange?: (value: string) => void;
}

export function TipTapEditor({
  content = "",
  onChange,
  onSelectionChange,
  onEditorReady,
  placeholder = "Start writing...",
  subject,
  onSubjectChange,
  preview,
  onPreviewChange,
}: TipTapEditorProps) {
  const handleSelectionUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (!onSelectionChange) return;
      const { from, to } = editor.state.selection;
      if (from !== to) {
        const text = editor.state.doc.textBetween(from, to, " ");
        onSelectionChange(text);
      } else {
        onSelectionChange("");
      }
    },
    [onSelectionChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onSelectionUpdate: handleSelectionUpdate,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[400px] px-10 py-8 text-center text-gray-800 [&_h1]:text-gray-900 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-gray-900 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:text-gray-800 [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold [&_a]:tracking-widest [&_a]:uppercase [&_a]:text-xs [&_hr]:my-8 [&_hr]:border-gray-200 [&_em]:text-gray-400 [&_em]:text-xs [&_em]:not-italic",
      },
    },
  });

  // Expose editor instance to parent
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Sync editor content when prop changes externally (e.g. after AI generation)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 flex-wrap border border-border rounded-t-md px-2 py-1.5 bg-muted/30">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="size-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="size-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight className="size-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          <ListOrdered className="size-3.5" />
        </ToolbarButton>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <ToolbarButton
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
          title="Add Link"
        >
          <LinkIcon className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="size-3.5" />
        </ToolbarButton>

        <div className="ml-auto flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="size-3.5" />
          </ToolbarButton>
        </div>
      </div>

      {/* White email preview card */}
      <div className="bg-white rounded-b-md shadow-sm max-w-[640px] mx-auto">
        {/* Subject + Preview inside card */}
        {(onSubjectChange || onPreviewChange) && (
          <div className="border-b border-gray-200 px-8 py-4 space-y-2">
            {onSubjectChange && (
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-gray-400 font-medium w-14 shrink-0">Subject</span>
                <input
                  type="text"
                  value={subject || ""}
                  onChange={(e) => onSubjectChange(e.target.value)}
                  placeholder="Add subject line..."
                  className="flex-1 text-sm text-gray-700 placeholder:text-gray-300 bg-transparent border-none outline-none"
                />
              </div>
            )}
            {onPreviewChange && (
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-gray-400 font-medium w-14 shrink-0">Preview</span>
                <input
                  type="text"
                  value={preview || ""}
                  onChange={(e) => onPreviewChange(e.target.value)}
                  placeholder="Add preview text..."
                  className="flex-1 text-sm text-gray-700 placeholder:text-gray-300 bg-transparent border-none outline-none"
                />
              </div>
            )}
          </div>
        )}

        {/* Editor content */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(active && "bg-accent text-accent-foreground")}
    >
      {children}
    </Button>
  );
}
