        var storedFame = localStorage.getItem('firstName')
        var storedLame = localStorage.getItem('lastName')
        var storedResult = localStorage.getItem('totalResult')
        var main = document.getElementById('main')
        if(storedResult >= 50){
            // Update existing elements
            $('#img1').animate({
                bottom : '-250px'
            },2000)
            $('#img2').animate({
                bottom : '-50px'
            },2000)
            $('#img3').animate({
                bottom : '400px'
            },1500)
            $('#img4').animate({
                bottom : '200px'
            },1500)
            $('#img5').animate({
                bottom : '500px'
            },2000)
            $('#img6').animate({
                bottom : '0'
            },2000)
            $('#img7').animate({
                bottom : '100px'
            },2500)
            $('#img8').animate({
                bottom : '500px'
            },2500)
            $('#img9').animate({
                bottom : '400px'
            },3000)
            $('#img10').animate({
                bottom : '200px'
            },3000)
            $('.container').animate({
                top : '200px'
            },2000)
            $('#img11').hide()
            document.querySelector('.welcomeMessage').innerHTML = `Congratulations! <span style="color: red;">${storedFame}</span> you passed the exam.`;
            document.querySelector('.grade').innerHTML = `Your Grade is : <span style="color: red;">${storedResult}%</span>`;
            document.querySelector('.bestLuck').innerHTML = `<span style="color: red;">Thanks</span>, Wish the best luck for you.`;
        }else if(storedResult < 50){
            $('#img1').hide()
            $('#img2').hide()
            $('#img3').hide()
            $('#img4').hide()
            $('#img5').hide()
            $('#img6').hide()
            $('#img7').hide()
            $('#img8').hide()
            $('#img9').hide()
            $('#img10').hide()
            $('.container').animate({
                top : '200px'
            },2000)
            $('#img11').animate({
                opacity : 1
            },3000)
            $('#img12').animate({
                opacity : 1
            },3000)
            document.querySelector('.welcomeMessage').innerHTML = `Unfortunately, <span style="color: red;">${storedFame},</span> you didn't pass the exam,<br> but don't worry, sometimes failure be the best way to success.`;
            document.querySelector('.grade').innerHTML = `Your Grade is : <span style="color: red;">${storedResult}%</span>`;
            document.querySelector('.bestLuck').innerHTML = `<span style="color: red;">Thanks for trying</span>, Wish the best luck for you.`;
            document.getElementsByTagName('body')[0].style.backgroundImage = ''
        }