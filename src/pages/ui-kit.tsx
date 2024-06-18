// pages/index.tsx
import type { NextPage } from 'next';

import Button from '@/components/ui/Button';
import CalendarNumber from '@/components/ui/CalendarNumber';
import HorizontalButton from '@/components/ui/HorizontalButton';

const Home: NextPage = () => {
  return (
    <div className="bg-telegram-bg flex min-h-screen flex-col items-center justify-center space-y-4 p-10">
      <h1 className="mb-6 text-2xl font-bold">Button Variations</h1>
      <div className="space-y-4">
        {/* Blue Buttons */}
        <div className="flex space-x-4">
          <Button type="blue" subtype="primary">
            Кнопка
          </Button>
          <Button type="blue" subtype="secondary">
            Кнопка
          </Button>
          <Button type="blue" subtype="white">
            Кнопка
          </Button>
        </div>

        {/* Pink Buttons */}
        <div className="flex space-x-4">
          <Button type="pink" subtype="primary">
            Кнопка
          </Button>
          <Button type="pink" subtype="secondary">
            Кнопка
          </Button>
          <Button type="pink" subtype="white">
            Кнопка
          </Button>
        </div>

        {/* Purple Buttons */}
        <div className="flex space-x-4">
          <Button type="purple" subtype="primary">
            Кнопка
          </Button>
          <Button type="purple" subtype="secondary">
            Кнопка
          </Button>
          <Button type="purple" subtype="white">
            Кнопка
          </Button>
        </div>

        {/* Orange Buttons */}
        <div className="flex space-x-4">
          <Button type="orange" subtype="primary">
            Кнопка
          </Button>
          <Button type="orange" subtype="secondary">
            Кнопка
          </Button>
          <Button type="orange" subtype="white">
            Кнопка
          </Button>
        </div>

        {/* Dark Buttons */}
        <div className="flex space-x-4">
          <Button type="dark" subtype="primary">
            Кнопка
          </Button>
          <Button type="dark" subtype="secondary">
            Кнопка
          </Button>
          <Button type="dark" subtype="white">
            Кнопка
          </Button>
        </div>

        {/* Ghost Button */}
        <div className="flex space-x-4">
          <Button type="ghost" subtype="primary">
            Кнопка
          </Button>
        </div>
      </div>

      {/* Horizontal Buttons */}
      <div className="mt-10 space-y-4">
        <HorizontalButton type="blue" leftText="Кнопка" rightText="Кнопка" />
        <HorizontalButton type="pink" leftText="Кнопка" rightText="Кнопка" />
        <HorizontalButton type="purple" leftText="Кнопка" rightText="Кнопка" />
        <HorizontalButton type="orange" leftText="Кнопка" rightText="Кнопка" />
      </div>

      {/* Example usage of font and gradient classes */}
      <div className="mt-10">
        <p className="font-blue-primary">This is a blue primary font color.</p>
        <p className="font-pink-primary">This is a pink primary font color.</p>
        <p className="font-purple-primary">This is a purple primary font color.</p>
        <p className="font-orange-primary">This is an orange primary font color.</p>
        <p className="font-dark-primary">This is a dark primary font color.</p>
      </div>

      <div className="mt-10">
        <div className="mb-4 rounded-lg bg-gradient-blue p-4 text-white">
          This is a blue gradient background.
        </div>
        <div className="mb-4 rounded-lg bg-gradient-pink p-4 text-white">
          This is a pink gradient background.
        </div>
        <div className="mb-4 rounded-lg bg-gradient-purple p-4 text-white">
          This is a purple gradient background.
        </div>
        <div className="mb-4 rounded-lg bg-gradient-orange p-4 text-white">
          This is an orange gradient background.
        </div>
      </div>

      {/* Example usage of gradient text classes */}
      <div className="mt-10">
        <p className="text-gradient-blue">This is a blue gradient text.</p>
        <p className="text-gradient-pink">This is a pink gradient text.</p>
        <p className="text-gradient-purple">This is a purple gradient text.</p>
        <p className="text-gradient-orange">This is an orange gradient text.</p>
      </div>

      {/* Calendar Number Elements */}
      <div className="mt-10 grid grid-cols-4 gap-4">
        <CalendarNumber type="default" number={1} />
        <CalendarNumber type="today" number={2} />
        <CalendarNumber type="periodPast" number={3} />
        <CalendarNumber type="periodFuture" number={4} />
        <CalendarNumber type="ovulationPast" number={5} />
        <CalendarNumber type="ovulationFuture" number={6} />
        <CalendarNumber type="select" number={7} />
        <CalendarNumber type="selected" number={8} />
      </div>
    </div>
  );
};

export default Home;
