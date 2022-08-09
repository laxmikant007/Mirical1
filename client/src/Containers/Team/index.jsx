import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PageTitle from '../../Components/UI/PageTitle'
import './Team.css'
import HomeHeading from '../../Components/UI/Home/HomeHeadings'
// import img1 from '../../img/img-team.webp'
import TeamGrid from '../../Components/UI/Grids/TeamGrid'
import team1 from '../../img/lakshay.webp'
import team2 from '../../img/uma.webp'
import team3 from '../../img/nipun.webp'
import team4 from '../../img/vikash.webp'

/**
* @author
* @function Team
**/

const Team = (props) => {
    return (
        <>
           <PageTitle title="Team" para="This is where you'll learn about our team members and their positions." />
           <section className="section-padding team-section">
           <Container>
                <Row>
                    <Col className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                        <HomeHeading class="team-section-heading clearfix" span="Our Team" h2="Meet our professional team members" p="These are the people behind all this hard work." />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-xs-12">
                        <div className="team-grids">
                            <TeamGrid imgSrc={team1} name="Lakshay Yadav" desig="Managing Director" instaLink="https://instagram.com/lakshayy.yyadav" facebookLink="https://facebook.com/xxLakshayxx" twitterLink="https://twitter.com/lxkshay" linkedinLink="https://linkedin.com/in/lakshay-yadav" />
                            <TeamGrid imgSrc={team2} name="Umashankar Sarswat" desig="Managing Director" instaLink="https://instagram.com/anti_gravity_machine" facebookLink="https://facebook.com/wizard.OO7" twitterLink="https://twitter.com/123rahulsarswat" linkedinLink="https://instagram.com/anti_gravity_machine" />
                            <TeamGrid imgSrc={team3} name="Nipun Goyal" desig="SEO Specialist" instaLink="https://instagram.com/nipun.__.goyal" facebookLink="https://facebook.com/nipun.goyal.585" twitterLink="https://instagram.com/nipun.__.goyal" linkedinLink="https://linkedin.com/in/nipun-goyal-49a27218a" />
                            <TeamGrid imgSrc={team4} name="Vikash Upman" desig="Service Manager" instaLink="https://instagram.com/vikash_upman000" facebookLink="https://instagram.com/vikash_upman000" twitterLink="https://instagram.com/vikash_upman000" linkedinLink="https://instagram.com/vikash_upman000" />
                        </div>
                    </Col>
                </Row>
            </Container>
           </section>
        </>
    )
}


export default Team