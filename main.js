fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(console.log('HTTP Error'));
        }
        return response.json();
    })
    .then(data => {

        const colors = {
            work: "#ff8c66ff",
            play: "#56c2e6ff",
            study: "#ff5c7cff",
            exercise: "#4acf81ff",
            social: "#7536d3ff",
            "self-care": "#f1c65bff"
        }
        const labels = {
            daily: "Yesterday",
            weekly: "Last week",
            monthly: "Last month"
        }
        const timeframes = document.querySelectorAll(".timeframe");
        const cards = document.querySelector("#cards");
        cards.innerHTML = "";

        data.forEach(item => {
            let iconname = item.title.toLowerCase().replace(/\s+/g, "-", "_");
            let color = colors[iconname];
            cards.innerHTML +=
                `<div class="card rounded-2xl bg-[${color}] lg:w-[15.93rem] h-1/2 pt-10 bg-[url(images/icon-${iconname}.svg)] bg-no-repeat bg-position-[top_-0.5rem_right_1.3rem] bg-size-[4.6rem]">
                <div class="p-[2rem] rounded-2xl bg-[#1c204b] hover:bg-[#33397a] cursor-pointer flex flex-col gap-[1rem]">
                    <div class="flex flex-row justify-between items-start text-white">
                        <span id="title" class="font-medium text-[1.125rem]">${item.title}</span>
                        <img class="self-center" src="images/icon-ellipsis.svg" alt="icon-ellipsis"/>
                    </div>
                    <div class="flex md:flex-col md:gap-[1rem] max-md:flex-row max-md:justify-between max-md:items-center">
                        <span class="md:text-[3.5rem] text-3xl font-light text-white"> - </span>
                        <span class="font-normal text-[#bbc0ff] text-[1rem]"> -- </span>
                    </div>
                </div>
            </div>`;
        });

        timeframes.forEach(time => {
            time.addEventListener("click", (t) => {
                cards.innerHTML = "";

                for (let i = 0; i < data.length; i++) {
                    let periods = Object.keys(data[i].timeframes);
                    for (let j = 0; j < periods.length; j++) {
                        let period = periods[j]
                        if (t.target.id === period) {
                            data.forEach(item => {
                                if (item.title === data[i].title) {
                                    let iconname = item.title.toLowerCase().replace(/\s+/g, "-", "_");
                                    let color = colors[iconname];

                                    cards.innerHTML +=
                                        `<div class="card rounded-2xl bg-[${color}] lg:w-[15.93rem] h-1/2 pt-10 bg-[url(images/icon-${iconname}.svg)] bg-no-repeat bg-position-[top_-0.5rem_right_1.3rem] bg-size-[4.6rem]">
                                        <div class="p-[2rem] rounded-2xl bg-[#1c204b] hover:bg-[#33397a] cursor-pointer flex flex-col gap-[1rem]">
                                            <div class="flex flex-row justify-between items-start text-white">
                                                <span id="title" class="font-medium text-[1.125rem]">${item.title}</span>
                                                <img class="self-center" src="images/icon-ellipsis.svg" alt="icon-ellipsis"/>
                                            </div>
                                            <div class="flex md:flex-col md:gap-[1rem] max-md:flex-row max-md:justify-between max-md:items-center">
                                                <span class="md:text-[3.5rem] text-3xl font-light text-white">${data[i].timeframes[period].current}hrs</span>
                                                <span class="font-normal text-[#bbc0ff] text-[1rem]">${labels[period]} - ${data[i].timeframes[period].previous}hrs</span>
                                            </div>
                                        </div>
                                    </div>`;
                                }
                            });
                        }
                    };
                }
            });
        });
    })
    .catch(error => {
        console.error('error:', error);
    });