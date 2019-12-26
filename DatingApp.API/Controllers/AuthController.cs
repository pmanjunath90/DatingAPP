using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {            
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();

            if (await _repo.UserExist(userForRegisterDto.UserName))
                return BadRequest("User already exist");

            var userToCreat = new User
            {
                UserName = userForRegisterDto.UserName
            };

            var createdUser = await _repo.Register(userToCreat, userForRegisterDto.Password);
            return StatusCode(201);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var UserFromRepo = await _repo.Login(userForLoginDto.UserName, userForLoginDto.Password.ToLower());

            if (UserFromRepo == null) return Unauthorized();

            var claims = new[]
                        {
                            new Claim(ClaimTypes.NameIdentifier,UserFromRepo.Id.ToString()),
                            new Claim(ClaimTypes.Name, userForLoginDto.UserName)
                        };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config
                            .GetSection("AppSettings:Token").Value));
            
            var cred= new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);


            var tokenDescripter = new SecurityTokenDescriptor{
                                Subject=new ClaimsIdentity(claims),
                                Expires=DateTime.Now.AddDays(1),
                                SigningCredentials=cred

                                    };

            var tokenHandler= new JwtSecurityTokenHandler();

            var token= tokenHandler.CreateToken(tokenDescripter);

            return Ok( new{ 
                token=tokenHandler.WriteToken(token)
            });

        }
    }
}