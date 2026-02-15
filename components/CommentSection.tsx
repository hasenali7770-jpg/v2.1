"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { Heart, Reply, MoreVertical, Edit, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useSession } from "@/app/contexts/SessionContext"
import { Locale } from "@/lib/i18n"

interface Comment {
  id: string
  content: string
  userId: string
  userName: string
  userImage?: string
  createdAt: string
  likes: number
  liked?: boolean
  replies?: Comment[]
}

interface CommentSectionProps {
  courseId?: string
  lessonId?: string
  locale: Locale
}

export function CommentSection({ courseId, lessonId, locale }: CommentSectionProps) {
  const { user } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [loading, setLoading] = useState(false)

  const dateLocale = locale === "ar" ? ar : enUS

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          courseId,
          lessonId,
        }),
      })

      if (res.ok) {
        const comment = await res.json()
        setComments([comment, ...comments])
        setNewComment("")
      }
    } catch (error) {
      console.error("Failed to post comment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (commentId: string) => {
    if (!user) return

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: "POST",
      })

      if (res.ok) {
        setComments(comments.map(c => 
          c.id === commentId 
            ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked }
            : c
        ))
      }
    } catch (error) {
      console.error("Failed to like comment:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add comment */}
      {user ? (
        <div className="flex gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-brand text-white flex items-center justify-center">
            {user.name?.[0] || "U"}
          </div>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder={locale === "ar" ? "اكتب تعليقك..." : "Write a comment..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={loading}>
                {locale === "ar" ? "نشر التعليق" : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-bg p-4 text-center text-sm text-muted dark:bg-night-bg">
          {locale === "ar" 
            ? "سجل دخول لتتمكن من التعليق" 
            : "Login to comment"}
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-brand text-white flex items-center justify-center text-sm">
                {comment.userName?.[0] || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-ink dark:text-night-text">
                    {comment.userName}
                  </span>
                  <span className="text-xs text-muted dark:text-night-muted">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: dateLocale,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/80 dark:text-night-text/80">
                  {comment.content}
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-xs ${
                      comment.liked
                        ? "text-red-500"
                        : "text-muted hover:text-red-500 dark:text-night-muted"
                    }`}
                  >
                    <Heart className={`h-3 w-3 ${comment.liked ? "fill-current" : ""}`} />
                    {comment.likes > 0 && comment.likes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="flex items-center gap-1 text-xs text-muted hover:text-brand dark:text-night-muted"
                  >
                    <Reply className="h-3 w-3" />
                    {locale === "ar" ? "رد" : "Reply"}
                  </button>
                </div>

                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <Textarea
                      placeholder={locale === "ar" ? "اكتب ردك..." : "Write your reply..."}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={() => setReplyingTo(null)}>
                        {locale === "ar" ? "نشر" : "Post"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setReplyingTo(null)
                          setReplyText("")
                        }}
                      >
                        {locale === "ar" ? "إلغاء" : "Cancel"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mr-8 space-y-3 border-r-2 border-stroke pr-4 dark:border-night-stroke">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-2">
                    <div className="h-6 w-6 shrink-0 rounded-full bg-accent text-white flex items-center justify-center text-xs">
                      {reply.userName?.[0] || "U"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-ink dark:text-night-text">
                          {reply.userName}
                        </span>
                        <span className="text-xs text-muted dark:text-night-muted">
                          {formatDistanceToNow(new Date(reply.createdAt), {
                            addSuffix: true,
                            locale: dateLocale,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-ink/80 dark:text-night-text/80">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
