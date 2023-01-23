import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import StoryList from "./components/storylist";

function App() {
  const [storyIDs, setStoryIDs] = useState([] as string[]);

  useEffect(() => {
    const fetchIDs = async () => {
      var res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));
      setStoryIDs(res);
    };
    fetchIDs();
  }, []);
  return (
    <div className="App">
      <StoryList storyIDs={storyIDs} />
    </div>
  );
}

export default App;
