import calendarSystems from "@calidy/dayjs-calendarsystems";
import HijriCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/HijriCalendarSystem";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Metadata } from "next";

import { Calendar, Container, Footer, Header } from "@/components";
import { createMetadata } from "@/utils";

require("dayjs/locale/id");

const locale = "id";
const today = dayjs().locale(locale);

export async function generateMetadata(props: { params: Record<string, string> }): Promise<Metadata> {
  const { params } = props;

  const date = dayjs(params.date, "MM-YYYY");

  return createMetadata(date);
}

dayjs.extend(customParseFormat);
dayjs.extend(calendarSystems);
dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());

export default function SpecificDate(props: { params: Record<string, string> }) {
  const { params } = props;

  let selectedMonth = today.clone();

  if (params.date && dayjs(params.date, "MM-YYYY", locale).isValid()) {
    selectedMonth = dayjs(params.date, "MM-YYYY", locale);
  }

  return (
    <Container>
      <Header today={today} />
      <Calendar locale={locale} selectedMonth={selectedMonth} today={today} />
      <Footer today={today} />
    </Container>
  );
}
