import ReactGA from "react-ga4";
import { googleAnalytics } from "./constants";
/**
 * Function to Fire Google Analytics Events
 * @param category
 * @param action
 * @param label
 * @param value
 */
export default function gaEvent(
  category: string,
  action: string,
  label: string,
  value: any
) {
  if (googleAnalytics.trackingCode != "") {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
      value: value,
    });
  }
}
