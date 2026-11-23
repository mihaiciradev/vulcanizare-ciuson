import { notFound } from "next/navigation";

// Any unknown URL inside a language shows that language's 404 page, inside the normal layout.
export default function CatchAll() {
  notFound();
}
