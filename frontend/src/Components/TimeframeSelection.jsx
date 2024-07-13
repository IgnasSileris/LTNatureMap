import React from 'react';
import { useTimeframeViewStore } from '../stores/timeframeViewStore';

function TimeframeButton(props) {
    const timeframeView = useTimeframeViewStore((state) => state.timeframeView);
    const setTimeframeView = useTimeframeViewStore((state) => state.setTimeframeView);

    let allStyles = timeframeView === props.name ? 'border-black px-1 bg-gray-300' : 'border-black px-1 hover:bg-gray-300';
    if (props.name === '1D') {
        allStyles += ' border-x'
    } else {
        allStyles += ' border-r'
    }

    return (
        <button title={props.title} className={allStyles} onClick={() => setTimeframeView(props.name)}>
            <span> {props.name}</span>
            {timeframeView === props.name && (<div className=" bg-black opacity-60 w-full h-0.5"></div>)}
        </button>
    );
}
function TimeframeSelection() {
    return (
        <div className="flex-initial">
            <TimeframeButton title="Today" name="1D"/>
            <TimeframeButton title="Past week" name="1W"/>
            <TimeframeButton title="Past month" name="1M"/>
            <TimeframeButton title="Past 6 months" name="6M"/>
            <TimeframeButton title="Past year" name="1Y"/>
            <TimeframeButton title="All-time" name="Max"/>
        </div>
    );
}

export default TimeframeSelection;