math.huge = 2 ^ 1024;
local JSON = require('exec/json');

-- TODO:
-- session?
-- campaign_manager:is_local_players_turn
-- add_first_tick_callback_sp_each

-- TODO: cleanup this mess
WH3_EDITOR_MOD = WH3_EDITOR_MOD or {
    req_path = os.getenv('appdata') .. '\\.twwh3editor\\req.json',
    res_path = os.getenv('appdata') .. '\\.twwh3editor\\res.json',
    file_regions = os.getenv('appdata') .. '\\.twwh3editor\\regions.json',
    file_ownership = os.getenv('appdata') .. '\\.twwh3editor\\ownership.json',
    file_characters = os.getenv('appdata') .. '\\.twwh3editor\\characters.json',
    file_session = os.getenv('appdata') .. '\\.twwh3editor\\session.json',
    version = '0.1.0',
    request_id = 0,
    session = nil,
};

local mod = WH3_EDITOR_MOD;

function mod.handle_response(result)
    local file = io.open(mod.res_path, 'w+');

    if file then
        local status, json = pcall(mod.process_response, result);
        file:write(json);
        file:close();
    end
end

function mod.process_response(result)
    local response = { id = mod.request_id, data = result };
    local json = JSON.encode(response);
    return json;
end

function mod.handle_request()
    local req = mod.read_request_file();
    if (req) then
        pcall(mod.process_request, req);
    end
end

function mod.read_request_file()
    local file = io.open(mod.req_path);

    if file then
        local contents = file:read("*a");
        file:close();
        return contents;
    end

    return nil;
end

function mod.process_request(req)
    local json = JSON.decode(req);

    if (mod.request_id ~= json.id) then
        if (mod.request_id == 0 and json.data.command ~= 'init') then
            return;
        end

        mod.request_id = json.id;
        local command = json.data.command;
        local args = json.data.args;
        local fn = mod[command];

        if fn then
            local result = fn(args);
            mod.handle_response(result);
        else
            mod.handle_response(nil);
        end
    end
end

function mod.init()
    return {
        session = mod.session,
        faction = cm.local_faction_name,
        campaign = cm:get_campaign_name(),
        regions = mod.get_regions(),
        factions = mod.get_factions(),
    };
end

function mod.loadstring(s)
    local fn, error = loadstring(s);

    if fn then
        local result = fn();
        return { data = result };
    end

    return { error = error };
end

function mod.get_regions()
    local regions = {};
    local region_list = cm:model():world():region_manager():region_list();

    for i = 0, region_list:num_items() - 1 do
        local region = region_list:item_at(i);
        local settlement = region:settlement();
        local key = region:name();

        regions[#regions+1] = {
            cqi = region:cqi(),
            key = key,
            name = common.get_localised_string('regions_onscreen_' .. key),
            province = {
                key = region:province_name(),
                name = common.get_localised_string('provinces_onscreen_' .. region:province_name()),
            },
            settlement = {
                cqi = settlement:cqi(),
                x = settlement:logical_position_x(),
                y = settlement:logical_position_y(),
                isPort = settlement:is_port(),
                climate = settlement:get_climate(),
            },
        };
    end

    return regions;
end

function mod.get_factions()
    local factions = {};
    local faction_list = cm:model():world():faction_list();

    for i = 0, faction_list:num_items() - 1 do
        local faction = faction_list:item_at(i);
        local name = faction:name();

        factions[name] = {
            cqi = faction:command_queue_index(),
            key = name,
            name = common.get_localised_string('factions_screen_name_' .. name),
            -- homeRegion = faction:has_home_region() and faction:home_region():name() or nil,
            flagPath = faction:flag_path(),
            isAllowedToCaptureTerritory = faction:is_allowed_to_capture_territory(),
        };
    end

    return factions;
end

function mod.get_characters()
    local characters = {};
    local faction_list = cm:model():world():faction_list();

    for i = 0, faction_list:num_items() - 1 do
        local faction = faction_list:item_at(i);
        local character_list = faction:character_list();

        for j = 0, character_list:num_items() - 1 do
            local character = character_list:item_at(j);

            if character:character_type('colonel') or
                character:is_embedded_in_military_force() or
                character:is_wounded() or
                character:is_politician()
            then
                -- continue
            else
                characters[#characters + 1] = {
                    cqi = character:cqi(),
                    faction = faction:name(),
                    type = character:character_type_key(),
                    subtype = character:character_subtype_key(),
                    hasGarrisonResidence = character:has_garrison_residence(),
                    x = character:logical_position_x(),
                    y = character:logical_position_y(),
                    forenameKey = character:get_forename(),
                    surnameKey = character:get_surname(),
                    forename = common.get_localised_string(character:get_forename()),
                    surname = common.get_localised_string(character:get_surname()),
                };
            end
        end
    end

    return characters;
end

function mod.get_ownership()
    local ownership = {};
    local region_list = cm:model():world():region_manager():region_list();

    for i = 0, region_list:num_items() - 1 do
        local region = region_list:item_at(i);
        local key = region:name();
        local faction = region:owning_faction():name();
        ownership[key] = faction;
    end

    return ownership;
end

function mod.write_ownership()
    local ownership = mod.get_ownership();
    local json = JSON.encode(ownership);
    mod.write_to_file(mod.file_ownership, json);
end

function mod.write_characters()
    local characters = mod.get_characters();
    local json = JSON.encode(characters);
    mod.write_to_file(mod.file_characters, json);
end

function mod.write_session()
    mod.file_session = os.getenv('appdata') .. '\\.twwh3editor\\session.json';
    mod.session = os.time(os.date("!*t"));
    mod.write_to_file(mod.file_session, mod.session);
end

function mod.write_to_file(path, data)
    local file = io.open(path, 'w+');

    if file then
        file:write(data);
        file:close();
    end
end

cm:add_first_tick_callback(
    function()
        mod.write_session();
        cm:remove_callback('mod_handle_request');
        cm:repeat_callback(mod.handle_request, 0.1, 'mod_handle_request');
        cm:remove_callback('write_characters');
        cm:repeat_callback(mod.write_characters, 0.5, 'write_characters');
        cm:remove_callback('write_ownership');
        cm:repeat_callback(mod.write_ownership, 0.5, 'write_ownership');
    end
);
