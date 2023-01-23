import { useEffect, useState } from "react";

interface StoryListProps {
  storyIDs: string[];
}
interface story {
  id: string;
  name: string;
  url: string;
}
const StoryList = (props: StoryListProps) => {
  const [stories, setStories] = useState([] as story[]);
  useEffect(() => {
    const fetchStories = async () => {
      const promises = props.storyIDs.map(async (id): Promise<story> => {
        const story = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        ).then((response) => response.json());
        return {
          id: story.id,
          name: story.title,
          url: story.url,
        };
      });
      const resolvedStories = await Promise.all(promises);
      setStories(resolvedStories);
    };
    fetchStories();
  }, [props.storyIDs]);
  return (
    <div>
      {stories.length == 0 && (
        <h1 className="text-center">Henter hacker nyheder</h1>
      )}
      {stories.map((story) => (
        <div key={story.id}>
          <a href={story.url}>{story.name}</a>
        </div>
      ))}
    </div>
  );
};
export default StoryList;
