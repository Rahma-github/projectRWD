let s_group = document.getElementsByClassName('s-group')[0];

console.log(s_group)

s_group.addEventListener('click', () => {
    s_group.style.backgroundColor = '#f7f7f7';
    document.getElementsByClassName('s-icon')[0].style.color = '#7c7b7b'
    document.querySelector(".s-npt").focus();
    document.querySelector(".s-npt").style.setProperty("--placeholder-color", "#7c7b7b");
    console.log('foucs')
})

document.addEventListener("click", function(event) {
    if (!s_group.contains(event.target)) { 
        s_group.style.backgroundColor = ""; 
    document.getElementsByClassName('s-icon')[0].style.color = '#f7f7f7'

        document.querySelector(".s-npt").style.setProperty("--placeholder-color", "#f7f7f7")
    }
});