// app/page.tsx

import { ContentArea } from "@/components/layout/HomeContentArea";
import FeaturedPosts from "@/components/post/FeaturedPosts";
import TodoWidgets from "@/components/home/TodoWidgets";
import { getPopularPosts } from "@/lib/actions/diary";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function HomePage({ params }: Props) {
  const { username } = await params;

  const popularPosts = await getPopularPosts(username);
  return (
    <ContentArea>
      <FeaturedPosts posts={popularPosts} username={username} />
      <TodoWidgets />
    </ContentArea>
  );
}
