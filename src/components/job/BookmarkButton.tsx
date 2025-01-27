import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface BookmarkButtonProps {
  jobId: number;
}

export const BookmarkButton = ({ jobId }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    setIsBookmarked(bookmarks.includes(jobId));
  }, [jobId]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
    
    if (!isBookmarked) {
      bookmarks.push(jobId);
      toast({
        title: "Job bookmarked",
        description: "Job has been added to your bookmarks",
      });
    } else {
      const index = bookmarks.indexOf(jobId);
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
      toast({
        title: "Bookmark removed",
        description: "Job has been removed from your bookmarks",
      });
    }
    
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBookmark}
      className={cn(
        "hover:bg-primary/10",
        isBookmarked && "text-yellow-500"
      )}
    >
      <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
    </Button>
  );
};