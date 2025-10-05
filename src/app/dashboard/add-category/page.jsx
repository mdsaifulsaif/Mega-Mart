import React from "react";

function page() {
  return (
    <div>
      <form className="flex flex-col ">
        <input type="text" placeholder="Category Name" />

        <input type="text" placeholder="Category Image Url" />

        <input type="button" value="Add Category" />
      </form>
    </div>
  );
}

export default page;
