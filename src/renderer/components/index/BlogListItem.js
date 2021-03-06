import React from 'react'

import { Avatar, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Stars } from '@material-ui/icons'

function ProfileAvatar({blog}) {
  if (blog.profileImageUrl) {
    return <Avatar size={40} src={blog.profileImageUrl} />
  } else {
    return <Avatar size={40}>{blog.title.slice(0,1)}</Avatar>
  }
}

export default function BlogListItem({blog, onSelect}) {

  return (
    <ListItem alignItems='flex-start' className="blog_item" button onClick={e => onSelect(blog)}>
      <ListItemAvatar>
        <ProfileAvatar blog={blog} />
      </ListItemAvatar>

      <ListItemText
        primary={blog.title}
        secondary={(
          <>
            <span className="blog_url">{(blog.secondaryUrl == '')? blog.url : blog.secondaryUrl}</span>
            {blog.description && <span> -- {blog.description}</span>}
          </>
        )}
      />
      {blog.default === 'Y' &&
        <Stars />
      }
    </ListItem>
  );
}
