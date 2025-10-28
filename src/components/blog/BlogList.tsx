import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-semibold mb-2'>No blogs found</h2>
        <p className='text-muted-foreground'>
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Card className='overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6'>
      <div className='relative h-30 w-full '>
        <img
          src={blog.image || "./placeholder.png"} alt='Article Image'
          className='mx-auto'
        />
      </div>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-start'>
          <div className='text-sm text-muted-foreground'>{blog.date}</div>
            <Badge variant='default' className='mb-2'>
              {blog.category}
            </Badge>
        </div>
        <Link to={blog.slug} className='hover:underline'>
          <h3 className='text-xl font-semibold'>{blog.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-muted-foreground'>{blog.excerpt}</p>
        
      </CardContent>
      <CardFooter className='pt-0 flex justify-between'>
        <span className='text-sm text-muted-foreground'>{blog.readTime}</span>
        <Link
          to={blog.slug}
          className='text-sm font-medium hover:underline'
        >
          Read more
        </Link>
      </CardFooter>
      
    </Card>
  );
}