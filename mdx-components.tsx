import type { MDXComponents } from "mdx/types";
import MdxImage from "@/components/MdxImage";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => <MdxImage src={props.src} alt={props.alt} title={props.title} />,
    ...components,
  };
}
