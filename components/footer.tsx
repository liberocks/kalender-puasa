import { Dayjs } from "dayjs";

export const Footer: React.FC<{ today: Dayjs }> = props => {
  const { today } = props;

  return (
    <footer aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl">
        <div className="border-t border-gray-900/10 pt-8">
          <div>
            <p className="mt-2 text-center text-sm leading-6 text-gray-600">
              Kalender ini bersifat perhitungan dan estimasi. Untuk kepastian, silakan merujuk kepada otoritas agama
              setempat.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
          </form>
        </div>
        <div className="my-8 flex flex-row justify-between border-t border-gray-900/10 pt-8">
          <p className="text-xs leading-5 text-gray-500 md:order-1 md:mt-0">&copy; {today.format("YYYY")} Liberocks</p>

          <div className="flex space-x-6 md:order-2">
            <a
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Github"
              key={"github-repository"}
              href="https://github.com/liberocks/kalender-puasa"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Github</span>

              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};