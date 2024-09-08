import { useEffect, useState } from "react";
import css from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { filterEmployees } from "../../redux/filter/slice";

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({ training: "", status: "" });

    const dispatch = useDispatch();

    const handleFilterClick = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (category, value) => {
        setSelectedFilter(prevState => ({
            ...prevState,
            [category]: prevState[category] === value ? "" : value,
        }));
    };

    useEffect(() => {
        console.log("Selected filter updated:", selectedFilter);
        dispatch(filterEmployees({
            training: selectedFilter.training,
            status: selectedFilter.status,
        }));
    }, [selectedFilter, dispatch]);

    const handleFilterContentClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={`${css.container} ${isOpen ? css.containerOpen : css.containerClosed}`} onClick={handleFilterClick}>
            <div className={css.filterWrapper}>
                <p className={css.title}>Фільтри</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={css.svg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
            </div>
            <div className={`${isOpen ? css.open : css.closed}`} onClick={handleFilterContentClick}>
                <div className={css.filterContentWrapper}>
                    <div className={css.filterContent}>
                        <div className={css.filterContentTitle}>Кількість навчань</div>
                        <label className={css.checkboxWrapper}>
                            <input
                                type="checkbox"
                                id="training-more"
                                checked={selectedFilter.training === "more"}
                                onChange={() => handleCheckboxChange("training", "more")}
                            />
                            Більше
                        </label>
                        <label className={css.checkboxWrapper}>
                            <input
                                type="checkbox"
                                id="training-less"
                                checked={selectedFilter.training === "less"}
                                onChange={() => handleCheckboxChange("training", "less")}
                            />
                            Менше
                        </label>
                    </div>
                    <div className={css.filterContent}>
                        <div className={css.filterContentTitle}>Статус</div>
                        <label className={css.checkboxWrapper}>
                            <input
                                type="checkbox"
                                id="status-active"
                                checked={selectedFilter.status === "active"}
                                onChange={() => handleCheckboxChange("status", "active")}
                            />
                            Активний
                        </label>
                        <label className={css.checkboxWrapper}>
                            <input
                                type="checkbox"
                                id="status-not-active"
                                checked={selectedFilter.status === "not-active"}
                                onChange={() => handleCheckboxChange("status", "not-active")}
                            />
                            Не активний
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
