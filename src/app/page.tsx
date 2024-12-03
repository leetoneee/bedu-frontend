import { Header, NavHeader } from '@/components';
import Image from 'next/image';
import girl_1 from '../../public/images/girl_1.svg';
import girl_2 from '../../public/images/girl_2.svg';
import girl_3 from '../../public/images/girl_3.svg';
import About_bdu_pic from '../../public/images/About_bdu_pic.svg';
import tick from '../../public/icons/tick.svg';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import ggmet from '../../public/images/ggmet.svg';
import video from '../../public/images/video.svg';
import feedback from '../../public/images/feedback.svg';
import youtube from '../../public/images/youtube.svg';
import fb from '../../public/images/fb.svg';
import { Footer } from '@/components';

export default function Home() {
  return (
    <div>
      <NavHeader />
      <div className="mt-0.5 flex">
        <div className="w-full overflow-x-auto bg-b-primary">
          <div className="overflow-auto sm:h-[calc(99vh-60px)]">
            <div className="h-[calc(100vh - 120px)] relative mx-auto flex w-full justify-center overflow-auto overflow-y-auto">
              <div className="w-full">
                <main className="flex flex-col">
                  {/* Phân trang 1  */}
                  <div className="flex h-screen flex-col bg-b-primary">
                    <div className="mx-16 mt-16 grid grid-cols-5 2xl:mx-20 2xl:mt-20">
                      <div className="col-span-3 mr-8 flex flex-col 2xl:mr-10">
                        <span className="mb-4 text-3xl font-semibold 2xl:text-4xl">
                          This is Your Gateway to Unlimited Educational
                          Resources
                        </span>
                        <div className="mb-7 flex flex-col 2xl:mb-8">
                          <span className="text-base">
                            Discover a world of learning at your fingertips with
                            our comprehensive educational
                          </span>
                          <span className="text-base">
                            platform. You're a student, educator, or lifelong
                            learner, our site offers
                          </span>
                          <span className="text-base">
                            an extensive collection of resources
                          </span>
                        </div>

                        {/* Learn more & Get Started button */}
                        <div className="flex flex-row gap-4">
                          <button className="h-14 w-44 rounded-md bg-outline-focus text-xl font-semibold text-white 2xl:w-48">
                            Learn More
                          </button>
                          <button className="h-14 w-44 rounded-md bg-outline-focus text-xl font-semibold text-white 2xl:w-48">
                            Get Started
                          </button>
                        </div>

                        {/* divider */}
                        <div className="mb-10 mt-4 h-[2px] w-full border-t bg-outline 2xl:mb-14"></div>

                        <div className="flex flex-row gap-8">
                          {/* Active student  */}
                          <div className="relative flex h-28 w-40 items-center justify-center rounded-md border border-outline bg-white shadow-lg 2xl:w-44">
                            <div className="absolute flex flex-col items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 text-outline-focus"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                                  clipRule="evenodd"
                                />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                              </svg>
                              <p className="font-semibold text-outline-focus">
                                140K
                              </p>
                              <p className="text-sm text-outline-focus">
                                Active Students
                              </p>
                            </div>
                          </div>

                          {/* Course  */}
                          <div className="relative flex h-28 w-40 items-center justify-center rounded-md border border-outline bg-white shadow-lg 2xl:w-44">
                            <div className="absolute flex flex-col items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 text-outline-focus"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                />
                              </svg>

                              <p className="font-semibold text-outline-focus">
                                18
                              </p>
                              <p className="text-sm text-outline-focus">
                                Courses
                              </p>
                            </div>
                          </div>

                          {/* Teacher  */}
                          <div className="relative flex h-28 w-40 items-center justify-center rounded-md border border-outline bg-white shadow-lg 2xl:w-44">
                            <div className="absolute flex flex-col items-center gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 text-outline-focus"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p className="font-semibold text-outline-focus">
                                45K
                              </p>
                              <p className="text-sm text-outline-focus">
                                Teachers
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Social Network  */}
                        <div className="mt-7 flex space-x-4 2xl:mt-8">
                          <FaFacebookSquare
                            size={40}
                            className="text-outline-focus"
                          />
                          <FaLinkedin
                            size={40}
                            className="text-outline-focus"
                          />
                          <FaInstagramSquare
                            size={40}
                            className="text-outline-focus"
                          />
                          <FaYoutube size={40} className="text-outline-focus" />
                        </div>
                      </div>
                      <div className="col-span-2 col-end-6 grid grid-cols-2 gap-5">
                        <div className="col-span-1 grid grid-rows-2 justify-end gap-5">
                          <Image
                            src={girl_1}
                            alt="girl 1"
                            className="row-span-1"
                          />
                          <Image src={girl_2} alt="girl 2" className="" />
                        </div>
                        <div className="col-span-1 col-end-3 xl:w-[215px] 2xl:w-[254px]">
                          <Image src={girl_3} alt="girl 3" />
                        </div>
                      </div>
                    </div>
                    {/* Divider */}
                    <hr className="mt-auto w-full border-t border-outline" />
                  </div>

                  {/* Phân trang 2 */}
                  <div className="flex h-screen flex-col bg-surface">
                    <div className="grid grid-cols-7 gap-20">
                      <div className="col-span-3 mt-20 h-5 2xl:mt-60">
                        <Image
                          src={About_bdu_pic}
                          alt="About BEDU picture"
                          className=""
                        />
                      </div>
                      <div className="col-span-4 col-end-8">
                        <div className="mr-28 mt-[106px] 2xl:mt-72">
                          <p className="text-4xl font-bold text-outline-focus 2xl:text-[40px]">
                            About BEDU
                          </p>
                          <p className="mt-6">
                            Discover a world of learning at your fingertips with
                            our comprehensive educational platform.you're a
                            student, educator, or lifelong learner, our site
                            offers an extensive collection of resources
                          </p>
                          <p className="mt-7">
                            Discover a world of learning at your fingertips with
                            our comprehensive educational platform.you're a
                            student, educator, or lifelong learner, our site
                            offers an extensive collection of resources
                          </p>
                          <div className="mt-8 flex flex-row items-center gap-5">
                            <Image src={tick} alt="Tick" className="" />
                            <p>Experienced instructor</p>
                          </div>
                          <div className="mt-4 flex flex-row items-center gap-5">
                            <Image src={tick} alt="Tick" className="" />
                            <p>Quality lectures and exercises</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Divider */}
                    <hr className="mt-auto w-full border-t border-outline" />
                  </div>

                  {/* Phân trang 3 */}
                  <div className="flex h-[120%] flex-col bg-b-primary pb-3 pt-16">
                    <p className="mx-auto text-5xl font-bold text-on-primary">
                      Featured categories
                    </p>
                    <div className="mt-10 grid grid-cols-7">
                      {/* Live program  */}
                      <div className="relative col-start-2 flex h-56 w-52 items-center justify-center rounded-md border border-outline bg-categories shadow-lg">
                        <div className="absolute flex flex-col items-center gap-1">
                          <Image src={ggmet} alt="GG Meet" className="" />
                          <p className="mt-4 font-medium text-on-surface">
                            Live Program
                          </p>
                          <div className="mt-3 flex flex-row gap-1">
                            <p className="text-sm text-outline-focus">
                              7 programs
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="mt-[2px] size-4 text-on-surface"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Self-study program  */}
                      <div className="relative col-start-4 flex h-56 w-52 items-center justify-center rounded-md border border-outline bg-categories shadow-lg">
                        <div className="absolute flex flex-col items-center gap-1">
                          <Image src={video} alt="Video" className="" />
                          <p className="mt-4 font-medium text-on-surface">
                            Self-study Program
                          </p>
                          <div className="mt-3 flex flex-row gap-1">
                            <p className="text-sm text-outline-focus">
                              7 programs
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="mt-[2px] size-4 text-on-surface"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Feedback  */}
                      <div className="relative col-start-6 flex h-56 w-52 items-center justify-center rounded-md border border-outline bg-categories shadow-lg">
                        <div className="absolute flex flex-col items-center gap-1">
                          <Image src={feedback} alt="Feedback" className="" />
                          <p className="mt-4 font-medium text-on-surface">
                            Feedback
                          </p>
                          <div className="mt-3 flex flex-row gap-1">
                            <p className="text-sm text-outline-focus">
                              7 feedbacks
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="mt-[2px] size-4 text-on-surface"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 grid grid-cols-7">
                      {/* Youtube */}
                      <div className="relative col-start-3 flex h-56 w-52 items-center justify-center rounded-md border border-outline bg-categories shadow-lg">
                        <div className="absolute flex flex-col items-center gap-1">
                          <Image
                            src={youtube}
                            alt="Youtube Channel"
                            className=""
                          />
                          <p className="mt-4 font-medium text-on-surface">
                            Youtube channel
                          </p>
                          <div className="mt-3 flex flex-row gap-1">
                            <p className="text-sm text-outline-focus">
                              7 subscribers
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="mt-[2px] size-4 text-on-surface"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Facebook  */}
                      <div className="relative col-start-5 flex h-56 w-52 items-center justify-center rounded-md border border-outline bg-categories shadow-lg">
                        <div className="absolute flex flex-col items-center gap-1">
                          <Image src={fb} alt="Facebook" className="" />
                          <p className="mt-4 font-medium text-on-surface">
                            Facebook
                          </p>
                          <div className="mt-3 flex flex-row gap-1">
                            <p className="text-sm text-outline-focus">
                              99+ follows
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="mt-[2px] size-4 text-on-surface"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Divider */}
                    {/* <hr className="mt-3 w-full border-t border-outline" /> */}
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
