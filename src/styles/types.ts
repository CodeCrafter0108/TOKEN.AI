export interface FlexProps {
  $direction?: "row" | "column";
  $justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  $align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  $gap?: number;
  $wrap?: "nowrap" | "wrap" | "wrap-reverse";
  $inline?: boolean;
}