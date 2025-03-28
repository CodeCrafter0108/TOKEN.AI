import { FilterOption } from "@/app/agents/components/ButtonFilters/types";
import { RuleSet } from "styled-components";

export type ExploreListData = {
  filterParam: FilterOption | '';
  icon: React.ReactNode;
  text: string;
  styles: RuleSet<object>;
};