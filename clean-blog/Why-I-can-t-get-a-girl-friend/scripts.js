
import singleData from "./2021有偶率.json";

const population_ages = [
    "0",
    "1～4",
    "5～9",
    "10～14",
    "15～19",
    "20～24",
    "25～29",
    "30～34",
    "35～39",
    "40～44",
    "45～49",
    "50～54",
    "55～59",
    "60～64",
    "65～69",
    "70～74",
    "75～79",
    "80～84",
    "85～89",
    "90～94",
    "95～99",
    "100+",
];

const single_ages = [
    "0～14",
    "15～19",
    "20～24",
    "25～29",
    "30～34",
    "35～39",
    "40～44",
    "45～49",
    "50～54",
    "55～59",
    "60～64",
    "65～69",
    "70～74",
    "75～79",
    "80～84",
    "85～89",
    "90～94",
    "95～99",
    "100",
];

const city = document.getElementById("city");

const tw_map = document.getElementById("map");
const pp = document.getElementById("pp");

tw_map.addEventListener("change", (e) => {
    // console.log(tw_map.value);
    reloadText();
});

document
    .getElementById("population-config")
    .addEventListener("population", () => {
        reloadText();
    });
const attractive = document.getElementById("attractive");
const attractive_text = document.getElementById("attractive-text");
attractive.addEventListener("change", (e) => {
    reloadText();
});

const intelligent = document.getElementById("intelligent");
const intelligentText = document.getElementById("intelligent-text");
intelligent.addEventListener("change", (e) => {
    reloadText();
});

const single = document.getElementById("single");
const singleText = document.getElementById("single-text");

const attractive_self = document.getElementById("attractive_self");
const attractive_self_text = document.getElementById("attractive_self_text");
attractive_self.addEventListener("change", (e) => {
    reloadText();
});

const intelligent_self = document.getElementById("intelligent_self");
const intelligent_self_text = document.getElementById("intelligent_self_text");
intelligent_self.addEventListener("change", (e) => {
    reloadText();
});

window.addEventListener("WebComponentsReady", function () {
    // console.log("ready");
    tw_map.select(2);
    single.setData(singleData);
});
function reloadText() {
    let m = mergeAge(tw_map.value, population_ages);
    city.textContent = numberWithCommas(
        m.map((x) => x.male + x.female).reduce((a, b) => a + b)
    );

    pp.setData(m);

    let p = handlePopulation(m);

    let attractiveValue = Math.round(attractive.value * p);
    attractive_text.textContent = attractiveValue;

    let intelligentValue = Math.round(intelligent.value * attractiveValue);
    intelligentText.textContent = intelligentValue;

    let single_percentage = handleSingle(singleData);
    let single_value = Math.round(single_percentage * intelligentValue);
    singleText.textContent = single_value;

    let attractive_self_value = Math.round(
        attractive_self.value * single_value
    );
    attractive_self_text.textContent = attractive_self_value;

    let intelligent_self_value = Math.round(
        intelligent_self.value * attractive_self_value
    );
    intelligent_self_text.textContent = intelligent_self_value;
}
function handlePopulation(m) {
    const input_age_min = document.getElementById("age_min");
    const input_age_max = document.getElementById("age_max");
    const gender = document.querySelector(
        "input[name=inlineRadioOptions]:checked"
    ).value;
    const population = document.getElementById("population");

    let age = pickAgeRange(
        m,
        Number(input_age_min.value),
        Number(input_age_max.value),
        gender,
        population_ages
    );
    population.textContent = numberWithCommas(age);

    return age;
}

function handleSingle(m) {
    const input_age_min = document.getElementById("age_min");
    const input_age_max = document.getElementById("age_max");
    const gender = document.querySelector(
        "input[name=inlineRadioOptions]:checked"
    ).value;

    let range_total = pickSinglePercentage(
        m,
        Number(input_age_min.value),
        Number(input_age_max.value),
        gender,
        single_ages
    );

   

    return range_total;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function mergeAge(data, ages) {
    if (data.length == 0) return [];
    return data
        .map((d) => convertAge(d, ages))
        .reduce((a, b) => {
            return a.map((x, i) => {
                return {
                    age: x.age,
                    male: x.male + b[i].male,
                    female: x.female + b[i].female,
                };
            });
        });
}

function convertAge(data, ages) {
    return ages.map((a) => {
        return {
            age: a,
            male: parseAge(data["男"][a]),
            female: parseAge(data["女"][a]),
        };
    });
}

function parseAge(n) {
    return parseFloat(n.replace(/,/g, ""));
}

function pickAgeRange(data, min, max, gender, ages) {
    let r = getRange(min, max, ages);
    // console.log(r.filter((x) => x.v));
    let in_range = r.filter((x) => x.v);
    let first = in_range.shift();
    let end = in_range.pop();

    // console.log(in_range.map((r) => data[r.i].male));

    let s = (g) =>
        data[first.i][g] * interpolation(first.r[0], first.r[1], min) +
        in_range.map((r) => data[r.i][g]).reduce((a, b) => a + b) +
        data[first.i][g] * interpolation(end.r[0], end.r[1], max);

    if (gender == "male") {
        return s("male");
    } else if (gender == "female") {
        return s("female");
    } else if (gender == "all") {
        return s("male") + s("female");
    } else return 0;
}


function pickSinglePercentage(data, min, max, gender, ages) {
    let r = getRange(min, max, ages);
    // console.log(r.filter((x) => x.v));
    let in_range = r.filter((x) => x.v);
    let first = in_range.shift();
    let end = in_range.pop();

    // console.log(in_range.map((r) => data[r.i].male));

    let s = (g) =>
        data[first.i][g] * interpolation(first.r[0], first.r[1], min) +
        in_range.map((r) => data[r.i][g]).reduce((a, b) => a + b) +
        data[first.i][g] * interpolation(end.r[0], end.r[1], max);

    if (gender == "male") {
        return 1 - s("male")/s('male_total');
    } else if (gender == "female") {
        return 1 - s("female")/s('female_total');
    } else if (gender == "all") {
        return 1 - s("male")/s('male_total') + s("female")/s('female_total');
    } else return 1;
}


function getRange(min, max, ages) {
    let range = ages
        .map((x) => x.replace("+", "").split("～"))
        .map((x) => x.map((y) => Number(y)));

    return range.map((r, i) => {
        if (r.length == 1) {
            return { i, r, v: r[0] == min || r[0] == max };
        }

        return {
            i,
            r,
            v:
                ((r[0] <= min && r[1] >= min) ||
                    (r[0] >= min && r[1] >= min)) &&
                ((r[0] <= max && r[1] >= max) || (r[0] <= max && r[1] <= max)),
        };
    });
}

function interpolation(a, b, x) {
    return (Math.abs(b - x) + 1) / (Math.abs(b - a) + 1);
}
