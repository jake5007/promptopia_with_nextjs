"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPrompts = (text) => {
    return posts.filter(
      (post) =>
        post.creator.username.includes(text.toLowerCase()) ||
        post.tag.includes(text.toLowerCase()) ||
        post.prompt.includes(text.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const searchResult = filterPrompts(e.target.value);
    setFilteredPosts(searchResult);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setFilteredPosts(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
