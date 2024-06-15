import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import dayjs, { Dayjs } from "dayjs";
import groupBy from "lodash/groupBy";
import dynamic from "next/dynamic";
import Link from "next/link";

import { cx } from "@/utils";

require("dayjs/locale/id");

interface IMonth {
  name: string;
  days: {
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isFasting?: boolean;
    isProhibited?: boolean;
    isMandatory?: boolean;
    isAyyamulBidh?: boolean;
    isMondayThursday?: boolean;
    isRecurring?: boolean;
    isTarwiyah?: boolean;
    isArafah?: boolean;
    isRamadhan?: boolean;
    isSyawwal?: boolean;
    isEidAlAdha?: boolean;
    isEidAlFitr?: boolean;
    isAshura?: boolean;
    isTasua?: boolean;
    isTasyriq?: boolean;
  }[];
}

interface CalendarProps {
  locale: string;
  selectedMonth: Dayjs;
  today: Dayjs;
}

export const Calendar: React.FC<CalendarProps> = props => {
  const { locale, selectedMonth } = props;

  const events: { date: Dayjs; name: string }[] = [];

  const startOfMonth = selectedMonth.startOf("month");
  const endOfMonth = selectedMonth.endOf("month");
  const totalDays = endOfMonth.diff(startOfMonth, "days");
  let startOffset = parseInt(startOfMonth.format("d"));
  startOffset = startOffset > 7 ? 0 : startOffset;
  let endOffset = 6 - parseInt(endOfMonth.format("d"));

  const month: IMonth = {
    name: selectedMonth.format("MMMM"),
    days: [
      ...Array.from(Array(startOffset).keys()).map(_ => ({ date: "" })),
      ...Array.from(Array(totalDays + 1).keys()).map(item => {
        const hijriDay = startOfMonth.add(item, "days").toCalendarSystem("islamic");
        const currentDate = startOfMonth.add(item, "days").toCalendarSystem("gregory");

        const isEidAlFitr = hijriDay.format("D-M") === "1-10";
        const isEidAlAdha = hijriDay.format("D-M") === "10-12";
        const isTasyriq = ["11-12", "12-12", "13-12"].includes(hijriDay.format("D-M"));
        const isProhibited = isEidAlFitr || isEidAlAdha || isTasyriq;

        const isToday = currentDate.isSame(dayjs(), "day");
        const isMondayThursday = !isProhibited && [1, 4].includes(parseInt(currentDate.format("d")));
        const isAyyamulBidh = !isProhibited && [13, 14, 15].includes(parseInt(hijriDay.format("D")));
        const isTarwiyah = hijriDay.format("D-M") === "8-12";
        const isArafah = hijriDay.format("D-M") === "9-12";
        const isRamadhan = hijriDay.format("M") === "9";
        const isSyawwal = !isProhibited && hijriDay.format("M") === "10";
        const isAshura = hijriDay.format("D-M") === "10-1";
        const isTasua = hijriDay.format("D-M") === "9-1";

        const isFasting = isMondayThursday || isAyyamulBidh || isArafah || isTarwiyah || !isProhibited;

        const isRecurring =
          !isArafah ||
          !isTarwiyah ||
          !isEidAlFitr ||
          !isEidAlAdha ||
          !isRamadhan ||
          !isSyawwal ||
          !isAshura ||
          !isTasua ||
          !isTasyriq;

        if (isMondayThursday) {
          events.push({ date: currentDate, name: "Puasa Senin Kamis" });
        }

        if (isAyyamulBidh) {
          events.push({ date: currentDate, name: "Puasa Ayyamul Bidh" });
        }

        if (isTarwiyah) {
          events.push({ date: currentDate, name: "Puasa Tarwiyah" });
        }

        if (isArafah) {
          events.push({ date: currentDate, name: "Puasa Arafah" });
        }

        if (isEidAlFitr) {
          events.push({ date: currentDate, name: "Idul Fitri (haram berpuasa)" });
        }

        if (isEidAlAdha) {
          events.push({ date: currentDate, name: "Idul Adha (haram berpuasa)" });
        }

        if (isRamadhan) {
          events.push({ date: currentDate, name: "Puasa Ramadhan" });
        }

        if (isSyawwal && !isEidAlFitr) {
          events.push({ date: currentDate, name: "Puasa 6 hari Syawwal" });
        }

        if (isAshura) {
          events.push({ date: currentDate, name: "Puasa Asyura" });
        }

        if (isTasua) {
          events.push({ date: currentDate, name: "Puasa Tasua" });
        }

        if (isTasyriq) {
          events.push({ date: currentDate, name: "Hari Tasyriq (haram berpuasa)" });
        }

        return {
          date: currentDate.format("YYYY-MM-DD"),
          isCurrentMonth: true,
          isToday,
          isMondayThursday,
          isAyyamulBidh,
          isFasting,
          isArafah,
          isTarwiyah,
          isRecurring,
          isProhibited,
          isRamadhan,
          isSyawwal,
          isAshura,
          isTasua,
        };
      }),
      ...Array.from(Array(endOffset).keys()).map(_ => ({ date: "" })),
    ],
  };

  return (
    <div>
      <div className="relative mt-4 grid grid-cols-1">
        <Link
          replace
          className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          href={`/${selectedMonth.subtract(1, "month").format("MM-YYYY")}`}
        >
          <span className="sr-only">Bulan sebelumnya</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
        <Link
          replace
          className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          href={`/${selectedMonth.add(1, "month").format("MM-YYYY")}`}
        >
          <span className="sr-only">Bulan selanjutnya</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
        <section>
          <h2 className="text-center text-sm font-semibold text-gray-900">{month.name}</h2>
          <div className="mt-6 grid grid-cols-7 text-center text-sm leading-6 text-gray-500">
            <p>Ahad</p>
            <p>{dayjs().locale(locale).day(1).format("dddd")}</p>
            <p>{dayjs().locale(locale).day(2).format("dddd")}</p>
            <p>{dayjs().locale(locale).day(3).format("dddd")}</p>
            <p>{dayjs().locale(locale).day(4).format("dddd")}</p>
            <p>{dayjs().locale(locale).day(5).format("dddd")}</p>
            <p>{dayjs().locale(locale).day(6).format("dddd")}</p>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {month.days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={cx(
                  day.isCurrentMonth ? "bg-white text-gray-900" : "bg-gray-50 text-gray-400",
                  day.isToday && "bg-marjan-100 font-semibold",
                  "has-tooltip relative py-1.5 hover:bg-gray-100 focus:z-10",
                )}
              >
                <time
                  dateTime={day.date}
                  className={cx(
                    day.isRecurring &&
                      day.isMondayThursday &&
                      !day.isAyyamulBidh &&
                      !day.isProhibited &&
                      !day.isRamadhan &&
                      "bg-yellow-200",
                    day.isRecurring && day.isAyyamulBidh && !day.isRamadhan && "bg-orange-200",
                    "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                    day.isArafah && "bg-blue-200",
                    day.isTarwiyah && "bg-blue-200",
                    day.isProhibited && "bg-red-500 text-white",
                    day.isRamadhan && "bg-marjan-600 font-semibold text-white",
                    day.isSyawwal && !day.isProhibited && "border-2 border-orange-200",
                    day.isAshura && "bg-lime-300",
                    day.isTasua && "bg-lime-300",
                    "tooltip-toggle",
                  )}
                  aria-label={dayjs(day.date).locale(locale).toCalendarSystem("islamic").format("D MMMM YYYY")}
                  aria-details={dayjs(day.date).locale(locale).toCalendarSystem("gregory").format("D MMMM YYYY")}
                >
                  {(day.date.split("-").pop() ?? "").replace(/^0/, "")}
                </time>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="border-b pb-4 text-base font-bold leading-6 text-marjan-700">Jadwal puasa</h2>
        <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
          {Object.entries(groupBy(events, "name")).map(([key, value]) => {
            return (
              <li className="flex items-center py-4 align-middle" key={`key`}>
                <p className="min-w-[50%] flex-auto font-medium text-gray-800 sm:mt-0">{key}</p>

                <div className="flex w-full flex-wrap justify-end space-x-2">
                  {(value as any[]).map((item, index) => {
                    return (
                      <time
                        key={item.date.format("D MMMM")}
                        dateTime="item.date.format('D MMMM')}"
                        className="mb-2 flex-none rounded-lg bg-white px-2 py-0.5"
                      >
                        {item.date.format("D MMMM")}
                      </time>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};
