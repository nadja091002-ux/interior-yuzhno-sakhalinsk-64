"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  Project,
  ProjectImage,
  ProjectSection,
} from "../content/project";

type LightboxImage = ProjectImage & {
  section: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetUrl(src: string) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}

function GalleryImage({
  image,
  index,
  onOpen,
}: {
  image: ProjectImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      className="gallery-image"
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Открыть изображение: ${image.alt}`}
    >
      <img
        src={assetUrl(image.src)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
    </button>
  );
}

function SectionGallery({
  section,
  imageIndex,
  onOpen,
}: {
  section: ProjectSection;
  imageIndex: Map<string, number>;
  onOpen: (index: number) => void;
}) {
  const usesMasonry =
    section.id === "living" ||
    section.id === "bathroom" ||
    section.id === "children";

  return (
    <section className="project-section" id={section.id}>
      <header className="section-header page-width">
        <p className="section-number">{section.number}</p>
        <div>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>
      </header>

      {section.featured ? (
        <div className="featured-visual page-width">
          <GalleryImage
            image={section.featured}
            index={imageIndex.get(section.featured.src) ?? 0}
            onOpen={onOpen}
          />
        </div>
      ) : null}

      <div className="section-galleries page-width">
        {section.galleries.map((gallery, galleryIndex) => (
          <div className="gallery-block" key={`${section.id}-${galleryIndex}`}>
            {gallery.label ? <h3>{gallery.label}</h3> : null}
            {usesMasonry ? (
              <>
                <div className="image-masonry image-masonry-desktop">
                  {[0, 1].map((columnIndex) => (
                    <div className="image-masonry-column" key={columnIndex}>
                      {gallery.images
                        .filter(
                          (_, imagePosition) =>
                            imagePosition % 2 === columnIndex,
                        )
                        .map((image) => (
                          <GalleryImage
                            image={image}
                            index={imageIndex.get(image.src) ?? 0}
                            onOpen={onOpen}
                            key={image.src}
                          />
                        ))}
                    </div>
                  ))}
                </div>
                <div className="image-masonry-mobile">
                  {gallery.images.map((image) => (
                    <GalleryImage
                      image={image}
                      index={imageIndex.get(image.src) ?? 0}
                      onOpen={onOpen}
                      key={image.src}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div
                className={`image-columns ${
                  gallery.images.length === 2 ? "image-columns-two" : ""
                }`}
              >
                {gallery.images.map((image) => (
                  <GalleryImage
                    image={image}
                    index={imageIndex.get(image.src) ?? 0}
                    onOpen={onOpen}
                    key={image.src}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectPresentation({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = useMemo<LightboxImage[]>(() => {
    const images: LightboxImage[] = [
      { ...project.plan, section: "Планировочное решение" },
    ];

    project.sections.forEach((section) => {
      if (section.featured) {
        images.push({ ...section.featured, section: section.title });
      }
      section.galleries.forEach((gallery) => {
        gallery.images.forEach((image) => {
          images.push({ ...image, section: gallery.label ?? section.title });
        });
      });
    });

    return images;
  }, [project]);

  const imageIndex = useMemo(
    () =>
      new Map(
        lightboxImages.map((image, index) => [image.src, index] as const),
      ),
    [lightboxImages],
  );

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % lightboxImages.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null
            ? null
            : (current - 1 + lightboxImages.length) % lightboxImages.length,
        );
      }
    };

    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, lightboxImages.length]);

  const currentImage =
    lightboxIndex === null ? null : lightboxImages[lightboxIndex];

  const showPrevious = () => {
    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + lightboxImages.length) % lightboxImages.length,
    );
  };

  const showNext = () => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % lightboxImages.length,
    );
  };

  return (
    <main>
      <section className="hero" aria-labelledby="project-title">
        <img
          className="hero-image"
          src={assetUrl(project.cover.src)}
          alt=""
          width={project.cover.width}
          height={project.cover.height}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-topline page-width">
          <span>Интерьерный проект</span>
          <span>01</span>
        </div>
        <div className="hero-content page-width">
          <p className="eyebrow">
            {project.location} · {project.area} · {project.year}
          </p>
          <h1 id="project-title">
            <span className="hero-title-line">Квартира 64&nbsp;м²</span>
            <span className="hero-title-line">в Южно-Сахалинске</span>
          </h1>
        </div>
        <a className="scroll-cue" href="#plan">
          Смотреть проект
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <nav className="project-nav" aria-label="Разделы проекта">
        <div className="page-width nav-track">
          <a href="#plan">Планировка</a>
          {project.sections.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="plan-section" id="plan">
        <div className="plan-intro page-width">
          <p className="section-number">00</p>
          <div>
            <p className="eyebrow">Основа проекта</p>
            <h2>Финальное согласованное планировочное решение</h2>
            <p className="plan-note">
              Размеры на плане указаны в миллиметрах и служат ориентиром
              для планировочного решения. Перед заказом и изготовлением
              мебели, встроенных конструкций и других изделий необходимо
              выполнить контрольные замеры на объекте. Финальные размеры и
              технические решения уточняются изготовителем или проектировщиком
              с учётом фактической геометрии помещения, отделки и монтажа.
            </p>
          </div>
        </div>
        <div className="plan-visual page-width">
          <GalleryImage
            image={project.plan}
            index={0}
            onOpen={setLightboxIndex}
          />
        </div>
      </section>

      {project.sections.map((section) => (
        <SectionGallery
          section={section}
          imageIndex={imageIndex}
          onOpen={setLightboxIndex}
          key={section.id}
        />
      ))}

      <footer className="project-footer">
        <div className="page-width footer-content">
          <h2>{project.title}</h2>
          <div className="footer-meta">
            <p>Интерьерный проект · {project.year}</p>
            <p>
              {project.location} · {project.area}
            </p>
            <p>Исполнитель: Тихомирова Надежда</p>
          </div>
        </div>
      </footer>

      {currentImage ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр изображения: ${currentImage.alt}`}
        >
          <button
            className="lightbox-backdrop"
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Закрыть просмотр"
          />
          <div className="lightbox-stage">
            <img
              src={assetUrl(currentImage.src)}
              alt={currentImage.alt}
              width={currentImage.width}
              height={currentImage.height}
            />
          </div>
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Закрыть"
          >
            ×
          </button>
          <button
            className="lightbox-arrow lightbox-previous"
            type="button"
            onClick={showPrevious}
            aria-label="Предыдущее изображение"
          >
            ←
          </button>
          <button
            className="lightbox-arrow lightbox-next"
            type="button"
            onClick={showNext}
            aria-label="Следующее изображение"
          >
            →
          </button>
          <div className="lightbox-caption">
            <p>{currentImage.section}</p>
            <p>
              {(lightboxIndex ?? 0) + 1} / {lightboxImages.length}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
