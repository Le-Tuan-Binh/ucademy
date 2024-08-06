import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GlobalState {
	expandedMedia: boolean;
	setExpandedMedia: (expanded: boolean) => void;
}

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				expandedMedia: false,
				setExpandedMedia: (expanded) => set({ expandedMedia: expanded }),
			}),
			{
				name: "global-storage",
			}
		)
	)
);
export default useGlobalStore;
