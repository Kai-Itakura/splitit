'use client';

import { Label, RadioGroup, RadioGroupItem } from '@repo/ui/components';
import { SetStateAction } from 'react';
import { SEARCH_TYPE, SearchType } from '../schema/search-user-form.schema';

const SearchTypeRadio = ({
  setSearchType,
}: {
  setSearchType: React.Dispatch<SetStateAction<SearchType>>;
}) => {
  return (
    <RadioGroup
      className="flex items-center gap-5"
      defaultValue={SEARCH_TYPE.EMAIL}
      onValueChange={(value) => setSearchType(value as SearchType)}
    >
      <div className="flex items-center gap-1">
        <RadioGroupItem value={SEARCH_TYPE.EMAIL} id={SEARCH_TYPE.EMAIL} />
        <Label htmlFor={SEARCH_TYPE.EMAIL}>email</Label>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value={SEARCH_TYPE.ID} id={SEARCH_TYPE.ID} />
        <Label htmlFor={SEARCH_TYPE.ID}>ID</Label>
      </div>
    </RadioGroup>
  );
};

export default SearchTypeRadio;
