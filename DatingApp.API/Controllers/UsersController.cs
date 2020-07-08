using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using DatingApp.API.Dtos;
using System.Security.Claims;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;// For Auto Mapping

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var users = await _repo.GetUsers();
            var usersToReturn= _mapper.Map<List<UserForListDTO>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailDTO>(user);

            return Ok(userToReturn);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody ]UserForUpdateDto userForUpdateDto)
        {
            if(id!= int.Parse( User.FindFirst( ClaimTypes.NameIdentifier).Value))
                return Unauthorized();                      

            var userFromRepo= await _repo.GetUser(id);

            if(userFromRepo == null)
                    return Ok("record from repo is null");

            _mapper.Map(userForUpdateDto,userFromRepo);        

            if(await _repo.SaveAll())
                return NoContent();

           throw new Exception($"Updating user ID:{id} failed on save");           
        } 
    }
}