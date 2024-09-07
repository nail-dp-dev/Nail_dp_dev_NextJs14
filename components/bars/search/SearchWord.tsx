import { useEffect, useState, useCallback } from 'react';
import { posts } from '../../../constants/example';

type TagResult = {
  tagName: string;
  tagImageUrl: string;
  photo: boolean;
  video: boolean;
};

type SearchWordProps = {
  searchWords: typeof posts;
  onTagClick: (tag: string) => void;
  searchTerm: string;
  tagResults: TagResult[];
};

export default function SearchWord({
  searchWords,
  onTagClick,
  searchTerm,
  tagResults,
}: SearchWordProps) {
  const [displayWords, setDisplayWords] = useState<TagResult[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchTerms = lowerCaseSearchTerm.split(' ').filter(Boolean);

      const filteredResults = tagResults.filter((result) => {
        const tagNameLower = result.tagName.toLowerCase();
        return searchTerms.some((term) => tagNameLower.includes(term));
      });

      const uniqueResults = Array.from(
        new Set(filteredResults.map((item) => item.tagName)),
      ).map((tagName) =>
        filteredResults.find((item) => item.tagName === tagName),
      );

      setDisplayWords(uniqueResults as TagResult[]);
    } else if (tagResults.length > 0) {
      setDisplayWords(tagResults);
    } else {
      const recommendedWords = searchWords.map((post) => ({
        tagName: post.data.tags[0].tagName,
        tagImageUrl: post.data.postImageUrls[0],
        photo: true,
        video: false,
      }));

      setDisplayWords(recommendedWords);
    }
  }, [searchWords, tagResults, searchTerm]);

  const handleTagClick = useCallback(
    (tagName: string) => {
      onTagClick(tagName);
    },
    [onTagClick],
  );

  return (
    <div>
      <p className="text-14px-normal-dP">
        {searchTerm.length > 0 ? '연관 검색어' : '추천 검색어'}
      </p>
      <div
        className="mt-[5px] flex snap-y flex-wrap gap-2.5 overflow-auto
        xs:max-h-[470px]
        sm:max-h-[470px]
        lg:max-h-[350px]
        xl:max-h-[230px]"
      >
        {displayWords.map((item, index) => (
          <button
            key={index}
            className="relative flex h-[110px] w-full 
            snap-start flex-col
            items-center
            justify-center 
            rounded-2xl
            bg-textDarkPurple 
            p-3 xs:w-[calc(50%-6px)] 
            sm:w-[calc(50%-6px)] md:w-[calc(33.333%-7px)]
            lg:w-[calc(25%-8px)] xl:w-[calc(20%-8px)] 2xl:w-[calc(14.444%-12px)] 2xl:max-w-[13.88%]  2xl:grow 3xl:w-[calc(14.444%-12px)] 3xl:max-w-[9.59%]"
            onClick={() => handleTagClick(item.tagName)}
          >
            {item.video ? (
              <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl">
                <video
                  src={item.tagImageUrl}
                  autoPlay
                  loop
                  muted
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
            ) : item.photo && item.tagImageUrl ? (
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: `url(${item.tagImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-50"></div>
              </div>
            ) : null}

            <div className="relative z-10 text-[0.94rem] font-extrabold text-white">
              {item.tagName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
