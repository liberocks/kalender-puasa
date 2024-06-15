import { Dayjs } from "dayjs";

export const Header: React.FC<{ today: Dayjs }> = props => {
  const { today } = props;

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-6 lg:px-0" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 flex justify-center space-x-2 p-1.5 align-middle">
            <span className="sr-only">Kalender Puasa</span>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#418B72" />
              <path
                d="M15.4286 6.85714C14.1404 8.14534 13.4167 9.8925 13.4167 11.7143C13.4167 13.5361 14.1404 15.2832 15.4286 16.5714C16.7168 17.8596 18.4639 18.5833 20.2857 18.5833C22.1075 18.5833 23.8547 17.8596 25.1429 16.5714C25.1429 18.4927 24.5731 20.3709 23.5057 21.9684C22.4383 23.5659 20.9211 24.811 19.1461 25.5463C17.371 26.2815 15.4178 26.4739 13.5334 26.0991C11.649 25.7242 9.91811 24.799 8.55954 23.4405C7.20097 22.0819 6.27578 20.351 5.90095 18.4666C5.52612 16.5822 5.7185 14.629 6.45375 12.8539C7.189 11.0789 8.4341 9.56171 10.0316 8.4943C11.6291 7.42688 13.5073 6.85714 15.4286 6.85714Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="pt-0.5 text-lg font-semibold">Kalender Puasa</p>
            <span className="mb-4 inline-flex items-center rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              beta
            </span>
          </a>
        </div>

        <div className="flex flex-row text-right">
          <div className="leading-1 text-sm font-medium text-gray-900">
            <p>{today.format("D MMMM YYYY")}</p>
            <p className="text-gray-600">{today.toCalendarSystem("islamic").format("D MMMM YYYY")}</p>
            <p className="sr-only">{today.toCalendarSystem("gregory").format("D MMMM YYYY")}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};
