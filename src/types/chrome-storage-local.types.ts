import type { autoMarkState } from "../constants/autoMarkStateKeys";

export type OLJ_AUTO_MARK_TOGGLE_STATE = {
  [autoMarkState.olj]: boolean;
};

export type LINKEDIN_AUTO_MARK_TOGGLE_STATE = {
  [autoMarkState.linkedin]: boolean;
};

export type INDEED_AUTO_MARK_TOGGLE_STATE = {
  [autoMarkState.indeed]: boolean;
};

export type JOBSTREET_AUTO_MARK_TOGGLE_STATE = {
  [autoMarkState.jobstreet]: boolean;
};

export type BOSSJOB_AUTO_MARK_TOGGLE_STATE = {
  [autoMarkState.bossjob]: boolean;
};

export type SHORTCUT_CONFIG = {
  shortcutConfig: {
    modifier: "shift" | "alt";
    key: string;
  };
};
