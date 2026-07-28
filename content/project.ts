export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectGallery = {
  label?: string;
  images: ProjectImage[];
};

export type ProjectSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  featured?: ProjectImage;
  galleries: ProjectGallery[];
};

export type Project = {
  title: string;
  location: string;
  area: string;
  year: string;
  cover: ProjectImage;
  plan: ProjectImage;
  sections: ProjectSection[];
};

export const project: Project = {
  title: "Квартира 64 м² в Южно-Сахалинске",
  location: "Южно-Сахалинск",
  area: "64 м²",
  year: "2026",
  cover: {
    src: "/images/hero-living-room.jpg",
    alt: "Зона гостиной с диваном у окна",
    width: 3000,
    height: 2095,
  },
  plan: {
    src: "/images/final-plan.png",
    alt: "Финальное согласованное планировочное решение квартиры с размерами",
    width: 2526,
    height: 1785,
  },
  sections: [
    {
      id: "entry",
      number: "01",
      title: "Прихожая",
      description:
        "Светлая входная зона со встроенным хранением и спокойной геометрией.",
      galleries: [
        {
          images: [
            { src: "/images/entry-front-door.jpg", alt: "Прихожая, вид на входную дверь", width: 678, height: 1024 },
            { src: "/images/entry-from-door.jpg", alt: "Прихожая, вид от входной двери", width: 576, height: 1024 },
            { src: "/images/entry-wardrobe.jpg", alt: "Встроенный шкаф и обувница в прихожей", width: 768, height: 945 },
            { src: "/images/entry-living-door.jpg", alt: "Коридор и дверь в кухню-гостиную", width: 768, height: 1024 },
          ],
        },
      ],
    },
    {
      id: "living",
      number: "02",
      title: "Кухня-гостиная",
      description:
        "Единое пространство для повседневной жизни, работы и семейных встреч.",
      galleries: [
        {
          images: [
            { src: "/images/living-room-window.jpg", alt: "Кухня-гостиная, общий вид в сторону окна", width: 768, height: 1024 },
            { src: "/images/living-room-sofa.jpg", alt: "Зона гостиной с диваном", width: 1800, height: 2400 },
            { src: "/images/living-room-tv.jpg", alt: "ТВ-зона и рабочее место в гостиной", width: 1085, height: 1450 },
            { src: "/images/living-room-sofa-alt.jpg", alt: "Зона гостиной, дополнительный ракурс", width: 768, height: 1024 },
            { src: "/images/living-room-overview.jpg", alt: "Общий вид кухни-гостиной в сторону входа", width: 768, height: 1024 },
            { src: "/images/dining-area.jpg", alt: "Столовая зона у окна", width: 576, height: 1024 },
            { src: "/images/kitchen-one.jpg", alt: "Кухня, первый ракурс", width: 768, height: 1024 },
            { src: "/images/kitchen-two.jpg", alt: "Кухня, второй ракурс", width: 768, height: 1024 },
          ],
        },
      ],
    },
    {
      id: "bedroom",
      number: "03",
      title: "Спальня",
      description:
        "Мягкая приватная зона с продуманным хранением и функциональным рабочим местом.",
      galleries: [
        {
          images: [
            { src: "/images/bedroom-bed.jpg", alt: "Спальня, общий вид на кровать", width: 1600, height: 1200 },
            { src: "/images/bedroom-from-entry.jpg", alt: "Спальня, вид от входа", width: 576, height: 1024 },
            { src: "/images/bedroom-dresser.jpg", alt: "Кровать и комод в спальне", width: 1600, height: 1200 },
            { src: "/images/bedroom-tv.jpg", alt: "ТВ-зона напротив кровати", width: 1024, height: 768 },
            { src: "/images/bedroom-corridor.jpg", alt: "Коридор при спальне", width: 576, height: 1024 },
            { src: "/images/bedroom-corridor-storage.jpg", alt: "Шкафы в коридоре при спальне", width: 768, height: 1024 },
          ],
        },
        {
          label: "Рабочая зона, варианты",
          images: [
            { src: "/images/bedroom-workplace-one.jpg", alt: "Рабочая зона в спальне, вариант 1", width: 768, height: 1024 },
            { src: "/images/bedroom-workplace-two.jpg", alt: "Рабочая зона в спальне, вариант 2", width: 768, height: 1024 },
            { src: "/images/bedroom-workplace-three.jpg", alt: "Рабочая зона в спальне, вариант 3", width: 768, height: 1024 },
            { src: "/images/bedroom-workplace-three-wide.jpg", alt: "Рабочая зона и кровать, вариант 3", width: 768, height: 1024 },
          ],
        },
      ],
    },
    {
      id: "wardrobe",
      number: "04",
      title: "Гардеробная",
      description:
        "Компактное хранение по трем стенам с открытыми секциями и местом для техники.",
      galleries: [
        {
          images: [
            { src: "/images/wardrobe-left.jpg", alt: "Гардеробная, левая стена", width: 1052, height: 1280 },
            { src: "/images/wardrobe-right.jpg", alt: "Гардеробная, правая стена", width: 1086, height: 1448 },
            { src: "/images/wardrobe-front.jpg", alt: "Гардеробная, стена напротив входа", width: 941, height: 1672 },
          ],
        },
      ],
    },
    {
      id: "bathroom",
      number: "05",
      title: "Санузел",
      description:
        "Теплая нейтральная отделка, встроенное хранение и мягкая подсветка зеркала.",
      galleries: [
        {
          images: [
            { src: "/images/bathroom-bath.jpg", alt: "Санузел, вид на ванну и зону раковины", width: 768, height: 1024 },
            { src: "/images/bathroom-lighting.jpg", alt: "Санузел, тумба с раковиной и зеркало с подсветкой", width: 1086, height: 1448 },
            { src: "/images/bathroom-shower.jpg", alt: "Санузел, вид на ванну, душ и зону раковины", width: 768, height: 1012 },
            { src: "/images/bathroom-toilet.jpg", alt: "Санузел, зона унитаза и полотенцесушителя", width: 576, height: 1024 },
          ],
        },
      ],
    },
    {
      id: "children",
      number: "06",
      title: "Детская",
      description:
        "Гибкая комната с двумя сценариями расстановки для одного или двух детей.",
      galleries: [
        {
          label: "Общие зоны",
          images: [
            { src: "/images/child-workplace.jpg", alt: "Рабочая зона в детской", width: 768, height: 1024 },
            { src: "/images/child-wardrobe.jpg", alt: "Шкаф и хранение в детской", width: 960, height: 1280 },
          ],
        },
        {
          label: "Вариант для одного ребенка",
          images: [
            { src: "/images/child-one-bed-side.jpg", alt: "Детская для одного ребенка, вид сбоку", width: 1280, height: 960 },
            { src: "/images/child-one-bed-curtains.jpg", alt: "Детская для одного ребенка с портьерами", width: 1086, height: 1448 },
            { src: "/images/child-one-bed-blinds.jpg", alt: "Детская для одного ребенка с жалюзи", width: 960, height: 1280 },
          ],
        },
        {
          label: "Вариант для двух детей",
          images: [
            { src: "/images/child-two-beds-side.jpg", alt: "Детская для двух детей, вид сбоку", width: 1280, height: 960 },
            { src: "/images/child-two-beds-window.jpg", alt: "Детская для двух детей, вид в сторону окна", width: 960, height: 1280 },
            { src: "/images/child-two-beds-wardrobe.jpg", alt: "Детская для двух детей, вид в сторону шкафа", width: 960, height: 1280 },
          ],
        },
      ],
    },
  ],
};
