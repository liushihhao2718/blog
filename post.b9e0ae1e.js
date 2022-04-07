/*!
 * Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */ // window.addEventListener('DOMContentLoaded', () => {
//     let scrollPos = 0;
//     const mainNav = document.getElementById('mainNav');
//     const headerHeight = mainNav.clientHeight;
//     window.addEventListener('scroll', function() {
//         const currentTop = document.body.getBoundingClientRect().top * -1;
//         if ( currentTop < scrollPos) {
//             // Scrolling Up
//             if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
//                 mainNav.classList.add('is-visible');
//             } else {
//                 console.log(123);
//                 mainNav.classList.remove('is-visible', 'is-fixed');
//             }
//         } else {
//             // Scrolling Down
//             mainNav.classList.remove(['is-visible']);
//             if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
//                 mainNav.classList.add('is-fixed');
//             }
//         }
//         scrollPos = currentTop;
//     });
// })
const ages = [
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
const city = document.getElementById("city");
const tw_map = document.getElementById("map");
const pp = document.getElementById("pp");
tw_map.addEventListener("change", (e)=>{
    // console.log(tw_map.value);
    reloadText();
});
const population_config_from = document.getElementById("population-config").addEventListener("population", ()=>{
    reloadText();
});
const attractive = document.getElementById('attractive');
const attractive_text = document.getElementById('attractive-text');
attractive.addEventListener('change', (e)=>{
    reloadText();
});
const intelligent = document.getElementById('intelligent');
const intelligentText = document.getElementById('intelligent-text');
intelligent.addEventListener('change', (e)=>{
    reloadText();
});
const attractive_self = document.getElementById('attractive_self');
const attractive_self_text = document.getElementById('attractive_self_text');
attractive_self.addEventListener('change', (e)=>{
    reloadText();
});
const intelligent_self = document.getElementById('intelligent_self');
const intelligent_self_text = document.getElementById('intelligent_self_text');
intelligent_self.addEventListener('change', (e)=>{
    reloadText();
});
window.addEventListener("WebComponentsReady", function() {
    // console.log("ready");
    tw_map.select(2);
});
function reloadText() {
    let m = mergeAge(tw_map.value);
    city.textContent = numberWithCommas(m.map((x)=>x.male + x.female
    ).reduce((a, b)=>a + b
    ));
    pp.setData(m);
    let p = handlePopulation();
    let attractiveValue = Math.round(attractive.value * p);
    attractive_text.textContent = attractiveValue;
    let intelligentValue = Math.round(intelligent.value * attractiveValue);
    intelligentText.textContent = intelligentValue;
    let attractive_self_value = Math.round(attractive_self.value * intelligentValue);
    attractive_self_text.textContent = attractive_self_value;
    let intelligent_self_value = Math.round(intelligent_self.value * attractive_self_value);
    intelligent_self_text.textContent = intelligent_self_value;
}
function handlePopulation() {
    const input_age_min = document.getElementById("age_min");
    const input_age_max = document.getElementById("age_max");
    const gender = document.querySelector("input[name=inlineRadioOptions]:checked").value;
    let m = mergeAge(tw_map.value);
    const population = document.getElementById("population");
    let age = pickAgeRange(m, Number(input_age_min.value), Number(input_age_max.value), gender);
    population.textContent = numberWithCommas(age);
    return age;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function mergeAge(data) {
    if (data.length == 0) return [];
    return data.map((d)=>convertAge(d)
    ).reduce((a, b)=>{
        return a.map((x, i)=>{
            return {
                age: x.age,
                male: x.male + b[i].male,
                female: x.female + b[i].female
            };
        });
    });
}
function convertAge(data) {
    return ages.map((a)=>{
        return {
            age: a,
            male: parseAge(data["男"][a]),
            female: parseAge(data["女"][a])
        };
    });
}
function parseAge(n) {
    return parseFloat(n.replace(/,/g, ""));
}
function pickAgeRange(data, min, max, gender) {
    let r = getRange(min, max);
    // console.log(r.filter((x) => x.v));
    let in_range = r.filter((x)=>x.v
    );
    let first = in_range.shift();
    let end = in_range.pop();
    // console.log(in_range.map((r) => data[r.i].male));
    let s = (g)=>data[first.i][g] * interpolation(first.r[0], first.r[1], min) + in_range.map((r)=>data[r.i][g]
        ).reduce((a, b)=>a + b
        ) + data[first.i][g] * interpolation(end.r[0], end.r[1], max)
    ;
    if (gender == "male") return s("male");
    else if (gender == "female") return s("female");
    else if (gender == "all") return s("male") + s("female");
    else return 0;
}
function getRange(min, max) {
    let range = ages.map((x)=>x.replace("+", "").split("～")
    ).map((x)=>x.map((y)=>Number(y)
        )
    );
    return range.map((r, i)=>{
        if (r.length == 1) return {
            i,
            r,
            v: r[0] == min || r[0] == max
        };
        return {
            i,
            r,
            v: (r[0] <= min && r[1] >= min || r[0] >= min && r[1] >= min) && (r[0] <= max && r[1] >= max || r[0] <= max && r[1] <= max)
        };
    });
}
function interpolation(a, b, x) {
    return (Math.abs(b - x) + 1) / (Math.abs(b - a) + 1);
}

//# sourceMappingURL=post.b9e0ae1e.js.map
