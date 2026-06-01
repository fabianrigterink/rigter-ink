import type { MDXComponents } from "mdx/types";
import MdxImage from "@/components/MdxImage";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <MdxImage src={props.src} alt={props.alt} title={props.title} />,
    // Exposed so authored JSX (e.g. side-by-side images) gets the same border + lightbox zoom.
    MdxImage,
    ...components,
  };
}
