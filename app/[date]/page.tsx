import calendarSystems from "@calidy/dayjs-calendarsystems";
import HijriCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/HijriCalendarSystem";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Metadata } from "next";

import { Calendar, Container, Footer, Header } from "@/components";

require("dayjs/locale/id");

const locale = "id";
const today = dayjs().locale(locale);

export const metadata: Metadata = {
  title: `Kalender Puasa Muslim ${today.format("MMMM YYYY")}`,
  description: `Kalender Puasa Wajib dan Sunnah untuk Muslim tahun ${today.format("MMMM YYYY")}`,
  icons: {
    icon: "/kal.png",
  },
};

dayjs.extend(customParseFormat);
dayjs.extend(calendarSystems);
dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());

export default function SpecificDate(props: { params: Record<string, string> }) {
  const { params } = props;

  let selectedMonth = today.clone();

  if (params.date && dayjs(params.date, "MMMM-YYYY", locale).isValid()) {
    selectedMonth = dayjs(params.date, "MMMM-YYYY", locale);
  }

  return (
    <Container>
      <Header today={today} />
      <Calendar locale={locale} selectedMonth={selectedMonth} today={today} />
      <Footer today={today} />
    </Container>
  );
}
