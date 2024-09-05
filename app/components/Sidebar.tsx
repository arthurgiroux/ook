// components/Sidebar.tsx
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link"; // Use Next.js Link component for navigation

export default function Sidebar() {
  return (
    <List>
      <Link href="/books" passHref>
        <ListItem component="button">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItem>
      </Link>

      <Link href="/authors" passHref>
        <ListItem component="button">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Authors" />
        </ListItem>
      </Link>
    </List>
  );
}
