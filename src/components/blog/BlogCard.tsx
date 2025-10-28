import { Blog } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/utils/styles";

export const BlogCard = ({
  post,
  className,
}: {
  post: Blog;
  className?: string;
}) => {
  return (
    <Card className={cn("flex flex-col h-full min-h-[250px]", className)}>
      <CardHeader>
        <CardTitle className="text-xl">
          <Link
            className="hover:text-primary-hover transition-colors"
            to={"/blogs/" + post.id}
          >
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
          <span>{post.date}</span>
          <span className="mx-1">•</span>
          <span>{post.readTime} min read</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/10 mr-2 flex items-center justify-center text-primary font-semibold">
              {post.author.charAt(0)}
            </div>
            <span>{post.author}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
