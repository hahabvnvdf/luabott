const { MessageEmbed } = require('discord.js');
const random = require('random-number-csprng');
module.exports = {
    randomcard: async function(listofcard) {
        if (!Array.isArray(listofcard)) return null;
        const num = await random(0, listofcard.length - 1);
        const cards = listofcard[num];
        return cards;
    },
    checkautowin: function(list) {
        let aces = 0;
        let jqk = 0;
        if (list.length !== 2) return { check: false, data: { aces: aces, jqk: jqk } };
        for (let i = 0; i < list.length; i++) {
            if (!isNaN(list[i].slice(2, 3)) && list[i].slice(2, 3) !== '1') continue;
            else if (list[i].slice(2, 3).toLowerCase() == 'a') aces++;
                else if (list[i].slice(2, 3).toLowerCase() == 'j' || list[i].slice(2, 3).toLowerCase() == 'q' || list[i].slice(2, 3).toLowerCase() == 'k' || list[i].slice(2, 3) == '1') jqk++;
        }
        if (aces == 1 && jqk == 1) return { check: true, loaiwin: "xidach", data: { aces: aces, jqk: jqk } };
        else if (aces == 2) return { check: true, loaiwin: "xibang", data: { aces: aces, jqk: jqk } };
        else return { check: false, data: { aces: aces, jqk: jqk } };
    },
    getcardvalue: function(list) {
        let point = 0;
        let aces = 0;
        for (let i = 0; i < list.length; i++) {
            const cardname = list[i].slice(2, 3);
            if (!isNaN(cardname)) {
                switch(parseInt(cardname)) {
                    case 1:
                        point = point + 10;
                        break;
                    default:
                        point = point + parseInt(cardname);
                        break;
                }
            } else {
                switch(cardname) {
                    case "a":
                        aces++;
                        break;
                    default:
                        point = point + 10;
                        break;
                }
            }
        }
        if (aces == 0) return point.toString();
        else {
            for (let y = 0; y < aces; y++) {
                if (point > 10) point++;
                else point = point + 11;
            }
            return `${point}*`;
        }
    },
    createembed: function(nguoichoi, bet, deck_user, deck_bot, nguoichoi_val, bot_val, hidden_deck, end) {
        const embed = new MessageEmbed()
            .setColor("#00FFFF")
            .setFooter('Game ??ang di???n ra')
            .setAuthor(`${nguoichoi.tag}, b???n ???? c?????c ${bet} ????? ch??i x?? d??ch!`, nguoichoi.displayAvatarURL())
            .setFooter("??ang ch??i!");
        if (end == 'thang') {
            embed.setColor("#90EE90");
            embed.footer.text = `B???n th???ng ${bet} ti???n!`;
            embed.addFields(
                { name: `Bot: [${bot_val}]`, value: deck_bot },
                { name: `User: [${nguoichoi_val}]`, value: deck_user },
            );
        } else if (end == 'thua') {
            embed.setColor("#FF0000");
            embed.footer.text = `B???n thua ${bet} ti???n!`;
            embed.addFields(
                { name: `Bot: [${bot_val}]`, value: deck_bot },
                { name: `User: [${nguoichoi_val}]`, value: deck_user },
            );
        } else if (end == 'hoa') {
            embed.setColor("#D3D3D3");
            embed.footer.text = `B???n kh??ng m???t ti???n cho tr???n ?????u n??y`;
            embed.addFields(
                { name: `Bot: [${bot_val}]`, value: deck_bot },
                { name: `User: [${nguoichoi_val}]`, value: deck_user },
            );
        } else if (end == 'thangx2') {
            embed.setColor("#90EE90");
            embed.footer.text = `B???n th???ng ${parseInt(bet.replace(',', '')) * 2} ti???n!`;
            embed.addFields(
                { name: `Bot: [${bot_val}]`, value: deck_bot },
                { name: `User: [${nguoichoi_val}]`, value: deck_user },
            );
        } else if (end == 'not') {
            embed.addFields(
                { name: `Bot: [?]`, value: hidden_deck },
                { name: `User: [${nguoichoi_val}]`, value: deck_user },
            );
        }
        return embed;
    },
    createembedfield: function(deck) {
        if (!Array.isArray(deck)) return null;
        let line = "";
        deck.forEach(card => {
            line += card;
        });
        return line;
    },
    locbai : function(listOfCard, deck) {
        if (!Array.isArray(listOfCard) || !Array.isArray(deck)) return null;
        return listOfCard.filter(item => !deck.includes(item));
    },
};