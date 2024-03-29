import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { FilterComponent } from "../organism/materials-filter";
import { MaterialList } from "../organism/materials-list";
import { CloseButton } from "../atoms/close-button";
import { useEffect } from "react";
import scrollLock from "./../../helpers/scroll-lock";
import {
  partSlugDeTransform,
  partSlugTransform,
} from "../../helpers/slug-maker";
import { Title } from "../../components/moleculas/title-sub";
import { useQueryParam } from "../../hooks/query-params";
import { imageTransition } from "../../helpers/animation-controller";
import { AnimatePresence, motion } from "framer-motion";
import InView from "./in-view-provider";
import {
  meterialsAlterTitle,
  searchPlaceholder as searchFilterTitle,
} from "../../texts";
import {
  sortBy,
  featuresArrAll,
  clearAllTitle,
  filterTitle,
  sortByTitle,
  colorRangeTitle,
  texturesTitle,
  featuresTitle,
  reset,
  view,
  sortFilterTitle,
  noResultTitle,
  noResultMessage,
  sortParamName,
  colorParamName,
  texturesParamName,
  featuresParamName,
  searchParamName,
  pageParamName,
  texturesArrAll,
  colorRangeAll,
  colorGroupTransaltions,
} from "../../texts/filter";

const filterItemAnimation = imageTransition(-1.5);
const filterAnimation = imageTransition(1);
const gridAnimation = imageTransition(1);

export default function MaterialsArchive({ language, location, materials }) {
  const [sort, setSort] = useQueryParam(
    sortParamName[language],
    sortBy[language][0].val,
    location
  );
  const [color, setColor] = useQueryParam(
    colorParamName[language],
    "All",
    location
  );
  const [textures, setTextures] = useQueryParam(
    texturesParamName[language],
    "All",
    location
  );
  const [features, setFeatures] = useQueryParam(
    featuresParamName[language],
    "All",
    location
  );
  const [search, setSearch] = useQueryParam(
    searchParamName[language],
    "",
    location
  );
  const [page, setPage] = useQueryParam(pageParamName[language], "1", location);
  const [inputValue, setInputValue] = useState("");
  const [featuresArr] = useState(() => {
    const arr = [{ name: featuresArrAll[language], val: "All" }];
    materials.forEach((el) => {
      el.features.nodes.forEach((inEl) => {
        if (!arr.find((item) => item.name === inEl.name)) {
          arr.push({ name: inEl.name, val: inEl.name });
        }
      });
    });
    return arr;
  });
  const [texturesArr] = useState(() => {
    const arr = [{ name: texturesArrAll[language], val: "All" }];
    materials.forEach((el) => {
      el.textures.nodes.forEach((inEl) => {
        if (!arr.find((item) => item.name === inEl.name)) {
          arr.push({ name: inEl.name, val: inEl.name });
        }
      });
    });
    return arr;
  });
  const [colorRange] = useState(() => {
    const arr = [{ name: colorRangeAll[language], val: "All" }]; // TODO: przerobić kolory
    materials.forEach((el) => {
      el.materials.materialColorVariants.forEach((inEl) => {
        if (
          !arr.find(
            (item) =>
              item.name === colorGroupTransaltions[inEl.colorGroup][language]
          )
        ) {
          arr.push({
            name: colorGroupTransaltions[inEl.colorGroup][language],
            val: colorGroupTransaltions[inEl.colorGroup][language],
          });
        }
      });
    });
    return arr;
  });

  useEffect(() => {
    if (location.search === "") {
      if (sort === sortBy[language][0].val) {
        setSort(sortBy[language][0].val);
      }
      if (color === "All") {
        setColor("All");
      }
      if (textures === "All") {
        setTextures("All");
      }
      if (features === "All") {
        setFeatures("All");
      }
      if (search !== "") {
        setSearch("");
      }
    }
  }, [location]);

  const [isMobileFilterOpened, setMobileFilterOpened] = useState(false);

  const clearAll = () => {
    setColor("All");
    setTextures("All");
    setFeatures("All");
    setSearch("");
  };

  const filtredProducts = useMemo(() => {
    const json = JSON.stringify(materials);
    let arr = JSON.parse(json);
    let locSort = partSlugDeTransform(sort);
    let locColor = partSlugDeTransform(color);
    let locTextures = partSlugDeTransform(textures);
    let locFeatures = partSlugDeTransform(features);

    if (search !== "") {
      arr = arr.filter((el) => el.slug.includes(search.toLowerCase()));
    }

    if (locColor !== "All") {
      arr = arr.map((el) => {
        let data = { ...el, id: Math.random() };
        data.materials.materialColorVariants =
          data.materials.materialColorVariants.filter(
            (inEl) =>
              colorGroupTransaltions[inEl.colorGroup][language] ===
              partSlugDeTransform(color)
          );
        if (data.materials.materialColorVariants.length > 0) {
          return data;
        }
        return null;
      });

      arr = arr.filter((el) => el !== null);
    }
    if (locTextures !== "All") {
      arr = arr.filter((el) => {
        let isAccessed = false;
        el.textures.nodes.every((inEl) => {
          if (inEl.name === locTextures) {
            isAccessed = true;
            return false;
          }
          return true;
        });
        return isAccessed;
      });
    }
    if (locFeatures !== "All") {
      arr = arr.filter((el) => {
        let isAccessed = false;
        el.features.nodes.every((inEl) => {
          if (inEl.name === locFeatures) {
            isAccessed = true;
            return false;
          }
          return true;
        });
        return isAccessed;
      });
    }
    if (locSort === sortBy[language][0].val) {
      let filtrArr = [];
      arr.forEach((el) => {
        if (el.materials.generalMaterialInformationCopy.isPopular) {
          filtrArr.unshift(el);
        } else {
          filtrArr.push(el);
        }
      });
      arr = filtrArr;
    }
    if (locSort === sortBy[language][1].val) {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (locSort === sortBy[language][2].val) {
      let filtrArr = [];
      arr.forEach((el) => {
        if (el.materials.generalMaterialInformationCopy.isNewArrival) {
          filtrArr.unshift(el);
        } else {
          filtrArr.push(el);
        }
      });
      arr = filtrArr;
    }
    return arr;
  }, [materials, sort, color, textures, features, search]);

  // const [showCount, setShowCount] = useState(() => {
  //     if (typeof window !== 'undefined') {
  //         return window.innerWidth < 1024 ? 6 : 8
  //     }

  //     return 8
  // })

  useEffect(() => {
    if (isMobileFilterOpened) {
      scrollLock.enable("mobile-filter");
    } else {
      scrollLock.disable("mobile-filter");
    }

    return () => {
      scrollLock.disable("mobile-filter");
    };
  }, [isMobileFilterOpened]);

  return (
    <InView>
      <Wrapper>
        <FilterComponent
          filterAnimation={filterAnimation}
          view={view[language]}
          reset={reset[language]}
          featuresTitle={featuresTitle[language]}
          texturesTitle={texturesTitle[language]}
          colorRangeTitle={colorRangeTitle[language]}
          sortByTitle={sortByTitle[language]}
          filterTitle={filterTitle[language]}
          sortFilterTitle={sortFilterTitle[language]}
          sortBy={sortBy[language]}
          colorRange={colorRange}
          texturesArr={texturesArr}
          featuresArr={featuresArr}
          setSort={(v) => {
            setSort(partSlugTransform(v));
            setPage("1");
            window.scrollTo(0, 0);
          }}
          setColor={(v) => {
            setColor(partSlugTransform(v));
            setPage("1");
            window.scrollTo(0, 0);
          }}
          setTextures={(v) => {
            setTextures(partSlugTransform(v));
            setPage("1");
            window.scrollTo(0, 0);
          }}
          setFeatures={(v) => {
            setFeatures(partSlugTransform(v));
            setPage("1");
            window.scrollTo(0, 0);
          }}
          setMobileFilterOpened={setMobileFilterOpened}
          sort={partSlugDeTransform(sort)}
          color={partSlugDeTransform(color)}
          textures={partSlugDeTransform(textures)}
          features={partSlugDeTransform(features)}
          isMobileFilterOpened={isMobileFilterOpened}
          clearAll={clearAll}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSearch={setSearch}
          language={language}
        />
        <Title small={true} title={meterialsAlterTitle[language]} />
        <Container>
          <ActiveFilters variants={gridAnimation}>
            {color !== "All" && (
              <FilterItem
                variants={filterItemAnimation}
                onClick={() => {
                  setColor("All");
                }}
              >
                {/* replace capital letters with space and small letter because of bug in wp */}
                {partSlugDeTransform(color.replace(/([A-Z])/g, " $1").trim())}
                <CloseButton tabIndex={-1} />
              </FilterItem>
            )}
            {textures !== "All" && (
              <FilterItem
                variants={filterItemAnimation}
                onClick={() => {
                  setTextures("All");
                }}
              >
                {partSlugDeTransform(textures)}
                <CloseButton tabIndex={-1} />
              </FilterItem>
            )}
            {features !== "All" && (
              <FilterItem
                variants={filterItemAnimation}
                onClick={() => {
                  setFeatures("All");
                }}
              >
                {partSlugDeTransform(features)}
                <CloseButton tabIndex={-1} />
              </FilterItem>
            )}
            {search !== "" && (
              <FilterItem
                variants={filterItemAnimation}
                onClick={() => {
                  setSearch("");
                }}
              >
                {searchFilterTitle[language]}: „{search}”
                <CloseButton tabIndex={-1} />
              </FilterItem>
            )}
            {(color !== "All" ||
              textures !== "All" ||
              features !== "All" ||
              search !== "") && (
              <FilterItem
                variants={filterItemAnimation}
                onClick={() => {
                  clearAll();
                }}
                className="close"
              >
                {clearAllTitle[language]}
                <CloseButton tabIndex={-1} />
              </FilterItem>
            )}
          </ActiveFilters>
          <AnimatePresence mode="wait">
            {filtredProducts.length > 0 ? (
              <motion.div key="list" variants={gridAnimation}>
                <MaterialList
                  language={language}
                  itemKey={sort + color + textures + features + search}
                  page={page}
                  setPage={setPage}
                  color={color}
                  materials={filtredProducts}
                />
              </motion.div>
            ) : (
              <NoResults key="no-list" variants={gridAnimation}>
                <h2>{noResultTitle[language]}</h2>
                <p>{noResultMessage[language]}</p>
              </NoResults>
            )}
          </AnimatePresence>
        </Container>
      </Wrapper>
    </InView>
  );
}

const NoResults = styled(motion.div)`
  padding: 120px 0 120px 0;
  text-align: center;
  max-width: 926px;
  margin: 0 auto;

  h2 {
    margin-bottom: 42px;
    font-family: "Ivy";
    font-size: clamp(26px, ${(40 / 1194) * 100}vw, 40px);
    font-weight: 300;
    text-decoration: underline;
  }

  p {
    font-size: clamp(18px, ${(24 / 1194) * 100}vw, 24px);
    font-weight: 300;
  }
`;

const Wrapper = styled.div`
  background-color: var(--light-background);
  padding: 0 0 86px 0;
  position: relative;
  margin-bottom: calc(-1 * clamp(45px, ${(120 / 1194) * 100}vw, 160px));

  .button {
    margin: 0 auto;
    margin-top: 40px;
  }
`;

const ActiveFilters = styled(motion.div)`
  margin: 20px 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const FilterItem = styled(motion.button)`
  cursor: pointer;
  border: none;
  padding: 8px 20px;
  border-radius: 22px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: capitalize;
  position: relative;
  z-index: 20;

  button {
    width: 16px;
    height: 16px;
    svg {
      width: 16px;
      height: 16px;
    }
  }

  &.close {
    background-color: #eaeaea;
  }
`;
